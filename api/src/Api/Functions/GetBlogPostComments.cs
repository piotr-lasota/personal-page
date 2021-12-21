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
    private readonly IBlogPostRepository _blogPostRepository;

    public GetBlogPostComments(
        IBlogPostRepository blogPostRepository)
    {
        _blogPostRepository = blogPostRepository;
    }

    [Function(nameof(GetBlogPostComments))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        FunctionContext executionContext,
        string slug)
    {
        var logger = executionContext.GetLogger<GetBlogPostComments>();

        var post = await _blogPostRepository.GetBySlug(slug, CancellationToken.None);

        if (post is null)
        {
            logger.LogInformation("No post with slug {Slug} found", slug);
            return req.CreateResponse(HttpStatusCode.NotFound);
        }

        logger.LogInformation(
            "Returning {NumberOfComments} comments for post {Slug}",
            post.Comments.Count,
            post.Slug);

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(post.Comments);
        return response;
    }
}