using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Extensions;
using Domain.Models;
using Domain.Repositories;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace Api.Functions;

public class AddBlogPostComment
{
    private readonly IBlogPostRepository _blogPostRepository;

    public AddBlogPostComment(IBlogPostRepository blogPostRepository)
    {
        _blogPostRepository = blogPostRepository;
    }

    [Function(nameof(AddBlogPostComment))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        FunctionContext executionContext,
        string slug)
    {
        var cancellationTokenSource = new CancellationTokenSource();
        var token = cancellationTokenSource.Token;

        var post = await _blogPostRepository.GetBySlug(slug, token);

        if (post is null)
        {
            var response = req.CreateResponse(HttpStatusCode.NotFound);
            return response;
        }

        var (ok, addBlogPostRequest) = await req.Body
           .TryDeserializeToValidType<AddBlogPostCommentRequestBody>(token);

        if (!ok)
        {
            var response = req.CreateResponse(HttpStatusCode.BadRequest);
            return response;
        }

        var comment = new BlogPostComment(
            addBlogPostRequest.Author,
            addBlogPostRequest.Text,
            DateTimeOffset.Now);

        post.AddComment(comment);

        await _blogPostRepository.SaveAsync(post, token);

        return req.CreateResponse(HttpStatusCode.Created);
    }

    private class AddBlogPostCommentRequestBody
    {
        [Required]
        public string? Author { get; set; }

        [Required]
        public string? Text { get; set; }
    }
}