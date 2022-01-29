using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Api.Authorization;
using Api.Extensions;
using Domain.Commands.DeleteBlogPostComments;
using Domain.Errors;
using Domain.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions;

public class DeleteBlogPostComments
{
    private readonly ILogger<DeleteBlogPostComments> _logger;
    private readonly DeleteBlogPostCommentsCommandHandler _handler;

    public DeleteBlogPostComments(
        ILogger<DeleteBlogPostComments> logger,
        DeleteBlogPostCommentsCommandHandler handler)
    {
        _logger = logger;
        _handler = handler;
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

        var result = await _handler.Handle(
            new DeleteBlogPostCommentsCommand(slug, idsOfCommentsToBeDeleted),
            token);

        if (result.IsSuccess)
        {
            _logger.LogInformation(
                "Successfully removed comments {CommentIds} from post {Slug}",
                idsOfCommentsToBeDeleted,
                slug);

            return req.CreateResponse(HttpStatusCode.OK);
        }

        var missingResourceType = result.Errors
           .OfType<ResourceNotFoundError>()
           .Single()
           .ResourceType?.ToString();

        switch (missingResourceType)
        {
            case nameof(BlogPost):
                _logger.LogInformation("No post with slug {Slug} found", slug);
                break;
            case nameof(BlogPostComment):
                _logger.LogInformation(
                    "Not all {CommentIds} were found on post {Slug}",
                    idsOfCommentsToBeDeleted,
                    slug);
                break;
            default:
                _logger.LogWarning(
                    "Handler returned an unexpected {Type} of missing resource",
                    missingResourceType);
                break;
        }

        return req.CreateResponse(HttpStatusCode.NotFound);
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