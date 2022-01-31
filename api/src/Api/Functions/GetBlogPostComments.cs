using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain.Errors;
using Domain.Queries.GetBlogPostComments;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions;

public class GetBlogPostComments
{
    private readonly ILogger<GetBlogPostComments> _logger;
    private readonly GetBlogPostCommentsQueryHandler _handler;

    public GetBlogPostComments(
        ILogger<GetBlogPostComments> logger,
        GetBlogPostCommentsQueryHandler handler)
    {
        _logger = logger;
        _handler = handler;
    }

    [Function(nameof(GetBlogPostComments))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return req.CreateResponse(HttpStatusCode.UnprocessableEntity);
        }

        var result = await _handler.Handle(
            new GetBlogPostCommentsQuery(slug),
            CancellationToken.None);

        if (result.IsFailed)
        {
            var isNotFound = result.HasError<ResourceNotFoundError>();

            if (isNotFound)
            {
                return req.CreateResponse(HttpStatusCode.NotFound);
            }

            _logger.LogError("Handler failed with unexpected {Errors}", result.Errors);
            return req.CreateResponse(HttpStatusCode.InternalServerError);
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(result.Value);
        return response;
    }
}