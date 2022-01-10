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
    private readonly ILogger<GetBlogPostComments> _logger;

    public GetBlogPostComments(
        IBlogPostRepository blogPostRepository,
        ILogger<GetBlogPostComments> logger)
    {
        _blogPostRepository = blogPostRepository;
        _logger = logger;
    }

    [Function(nameof(GetBlogPostComments))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        string slug)
    {
        var post = await _blogPostRepository.GetBySlug(slug, CancellationToken.None);

        if (post is null)
        {
            _logger.LogInformation("No post with slug {Slug} found", slug);
            return req.CreateResponse(HttpStatusCode.NotFound);
        }

        _logger.LogInformation(
            "Returning {NumberOfComments} comments for post {Slug}",
            post.Comments.Count,
            post.Slug);

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(post.Comments);
        return response;
    }
}