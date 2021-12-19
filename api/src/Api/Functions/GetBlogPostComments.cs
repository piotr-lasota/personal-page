using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain.Repositories;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions;

public class GetBlogPostComments
{
    private readonly IBlogPostCommentRepository _repository;

    public GetBlogPostComments(
        IBlogPostCommentRepository repository)
    {
        _repository = repository;
    }

    [Function(nameof(GetBlogPostComments))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        FunctionContext executionContext,
        string slug)
    {
        var logger = executionContext.GetLogger(nameof(GetBlogPostComments));

        logger.LogInformation("Requested comments for post {slug}", slug);

        var commentsList = await _repository.GetAllForPost(slug, CancellationToken.None);

        if (commentsList is null)
        {
            return req.CreateResponse(HttpStatusCode.NotFound);
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(commentsList);
        return response;
    }
}