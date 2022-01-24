using System;
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

public class DeleteBlogPostComment
{
    private readonly ILogger<DeleteBlogPostComment> _logger;
    private readonly IBlogPostRepository _blogPostRepository;

    public DeleteBlogPostComment(
        IBlogPostRepository blogPostRepository,
        ILogger<DeleteBlogPostComment> logger)
    {
        _logger = logger;
        _blogPostRepository = blogPostRepository;
    }

    [Function(nameof(DeleteBlogPostComment))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(
            AuthorizationLevel.Function,
            "delete",
            Route = "blog/posts/{slug}/comments/{idOfCommentToDelete:guid}")]
        HttpRequestData req,
        string slug,
        Guid idOfCommentToDelete)
    {
        var cancellationTokenSource = new CancellationTokenSource();
        var token = cancellationTokenSource.Token;

        var claimsPrincipal = req.ParseClaimsPrincipal();

        if (!claimsPrincipal.HasClaim(ClaimTypes.Role, ApplicationRoles.Owner))
        {
            LogUnauthorizedAttemptToDeleteAComment(idOfCommentToDelete, claimsPrincipal);
            return req.CreateResponse(HttpStatusCode.Unauthorized);
        }

        var post = await _blogPostRepository.GetBySlug(slug, token);

        if (post is null)
        {
            _logger.LogInformation("No post with slug {Slug} found", slug);
            var response = req.CreateResponse(HttpStatusCode.NotFound);
            return response;
        }

        var commentToDelete = post.Comments
           .SingleOrDefault(comment => comment.Id == idOfCommentToDelete);

        if (commentToDelete is null)
        {
            _logger.LogInformation(
                "No comment with id {Id} found on post {Slug} found",
                idOfCommentToDelete,
                slug);

            var response = req.CreateResponse(HttpStatusCode.NotFound);
            return response;
        }

        post.RemoveComment(commentToDelete);

        await _blogPostRepository.SaveAsync(post, token);

        _logger.LogInformation(
            "Successfully removed comment {Id} from post {Slug}",
            idOfCommentToDelete,
            slug);

        return req.CreateResponse(HttpStatusCode.OK);
    }

    private void LogUnauthorizedAttemptToDeleteAComment(
        Guid idOfCommentToDelete,
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
                "Unauthenticated attempted to delete comment {CommentId}",
                idOfCommentToDelete);
        }
        else
        {
            _logger.LogWarning(
                "Unauthorized attempt to delete comment {CommentId} by {Provider}, {UserId}, {Name}, {Roles}",
                idOfCommentToDelete,
                provider,
                userId,
                name,
                string.Join(", ", roles));
        }
    }
}