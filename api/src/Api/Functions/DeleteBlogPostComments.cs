using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Api.Authorization;
using Api.Extensions;
using Domain.Repositories;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions;

public class DeleteBlogPostComments
{
    private readonly ILogger<DeleteBlogPostComments> _logger;
    private readonly IBlogPostRepository _blogPostRepository;

    public DeleteBlogPostComments(
        IBlogPostRepository blogPostRepository,
        ILogger<DeleteBlogPostComments> logger)
    {
        _logger = logger;
        _blogPostRepository = blogPostRepository;
    }

    [Function(nameof(DeleteBlogPostComments))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(
            AuthorizationLevel.Function,
            "delete",
            Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        string slug)
    {
        var cancellationTokenSource = new CancellationTokenSource();
        var token = cancellationTokenSource.Token;

        var claimsPrincipal = req.ParseClaimsPrincipal();

        if (!claimsPrincipal.HasClaim(ClaimTypes.Role, ApplicationRoles.Owner))
        {
            LogUnauthorizedAttemptToDeleteComments(slug, claimsPrincipal);
            return req.CreateResponse(HttpStatusCode.Unauthorized);
        }

        var (ok, bodyIdStrings) = await req.Body
           .TryDeserializingToValidTypeAsync<List<Guid>>(token);

        if (!ok)
        {
            return req.CreateResponse(HttpStatusCode.UnprocessableEntity);
        }

        ISet<Guid> idsOfCommentsToBeDeleted = bodyIdStrings!.ToHashSet();

        if (idsOfCommentsToBeDeleted.Count == 0)
        {
            return req.CreateResponse(HttpStatusCode.UnprocessableEntity);
        }

        var post = await _blogPostRepository.GetBySlugAsync(slug, token);

        if (post is null)
        {
            _logger.LogInformation("No post with slug {Slug} found", slug);
            return req.CreateResponse(HttpStatusCode.NotFound);
        }

        var commentsToDelete = post.Comments
           .Where(comment => idsOfCommentsToBeDeleted.Contains(comment.Id))
           .ToList();

        if (commentsToDelete.Count != idsOfCommentsToBeDeleted.Count)
        {
            var missedCommentIds = idsOfCommentsToBeDeleted
               .Except(post.Comments.Select(comment => comment.Id))
               .ToHashSet();

            _logger.LogInformation(
                "Comments {CommentIds} were not found on post {Slug} found",
                missedCommentIds,
                slug);

            return req.CreateResponse(HttpStatusCode.NotFound);
        }

        foreach (var commentToDelete in commentsToDelete)
        {
            post.RemoveComment(commentToDelete);
        }

        await _blogPostRepository.SaveAsync(post, token);

        _logger.LogInformation(
            "Successfully removed comments {CommentIds} from post {Slug}",
            idsOfCommentsToBeDeleted,
            slug);

        return req.CreateResponse(HttpStatusCode.OK);
    }

    private void LogUnauthorizedAttemptToDeleteComments(
        string postSlug,
        ClaimsPrincipal claimsPrincipal)
    {
        var provider = claimsPrincipal.Identity?.AuthenticationType;

        var userId = claimsPrincipal
           .FindFirst(claim => claim.Type == ClaimTypes.NameIdentifier)
          ?.Value;

        var name = claimsPrincipal
           .FindFirst(claim => claim.Type == ClaimTypes.Name)
          ?.Value;

        var roles = claimsPrincipal
           .FindAll(claim =>
                        claim.Type != ClaimTypes.Name &&
                        claim.Type != ClaimTypes.NameIdentifier)
           .Select(claim => claim.Value)
           .ToHashSet();

        if (provider is null &&
            userId is null &&
            name is null &&
            roles.Count == 0)
        {
            _logger.LogWarning(
                "Anonymous attempt to delete comments on post {Slug}",
                postSlug);
        }
        else
        {
            _logger.LogWarning(
                "Unauthorized attempt to delete comments on post {Slug} by {Provider}, {UserId}, {Name}, {Roles}",
                postSlug,
                provider,
                userId,
                name,
                string.Join(", ", roles));
        }
    }
}