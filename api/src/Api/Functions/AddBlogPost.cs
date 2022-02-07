using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Api.Authorization;
using Api.Extensions;
using Domain.Commands.RegisterBlogPost;
using Domain.Successes;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions;

public class AddBlogPost
{
    private readonly ILogger<AddBlogPost> _logger;
    private readonly RegisterBlogPostCommandHandler _handler;

    public AddBlogPost(
        ILogger<AddBlogPost> logger,
        RegisterBlogPostCommandHandler handler)
    {
        _logger = logger;
        _handler = handler;
    }

    [Function(nameof(AddBlogPost))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "put", Route = "blog/posts/{slug}")]
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
                "Attempt to register post {Slug}",
                slug);
            return req.CreateResponse(HttpStatusCode.Unauthorized);
        }

        var result = await _handler.Handle(
            new RegisterBlogPostCommand(slug),
            token);

        if (result.IsSuccess)
        {
            return req.CreateResponse(
                result.HasSuccess<AlreadyExisted>()
                    ? HttpStatusCode.NoContent
                    : HttpStatusCode.Created);
        }

        return req.CreateResponse(HttpStatusCode.UnprocessableEntity);
    }
}