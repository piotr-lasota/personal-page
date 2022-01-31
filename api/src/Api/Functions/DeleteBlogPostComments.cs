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
            _logger.LogUnauthorizedActivityAttempt(
                claimsPrincipal,
                "Attempt to delete comments on post {Slug}",
                slug);
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
            return req.CreateResponse(HttpStatusCode.OK);
        }

        return req.CreateResponse(result.HasError<ResourceNotFoundError>()
            ? HttpStatusCode.NotFound
            : HttpStatusCode.UnprocessableEntity);
    }
}