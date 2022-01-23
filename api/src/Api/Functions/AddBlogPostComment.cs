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
using Microsoft.Extensions.Logging;

namespace Api.Functions;

public class AddBlogPostComment
{
    private readonly ILogger<AddBlogPostComment> _logger;
    private readonly IBlogPostRepository _blogPostRepository;

    public AddBlogPostComment(
        ILogger<AddBlogPostComment> logger,
        IBlogPostRepository blogPostRepository)
    {
        _blogPostRepository = blogPostRepository;
        _logger = logger;
    }

    [Function(nameof(AddBlogPostComment))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        string slug)
    {
        var cancellationTokenSource = new CancellationTokenSource();
        var token = cancellationTokenSource.Token;

        var post = await _blogPostRepository.GetBySlug(slug, token);

        if (post is null)
        {
            _logger.LogInformation("No post with slug {Slug} found", slug);
            var response = req.CreateResponse(HttpStatusCode.NotFound);
            return response;
        }

        var (ok, addBlogPostRequest) = await req.Body
           .TryDeserializeToValidType<AddBlogPostCommentRequestBody>(token);

        if (!ok)
        {
            _logger.LogInformation("Invalid comment request provided");
            var response = req.CreateResponse(HttpStatusCode.BadRequest);
            return response;
        }

        var comment = new BlogPostComment(
            addBlogPostRequest.Author,
            addBlogPostRequest.Text,
            DateTimeOffset.Now);

        post.AddComment(comment);

        await _blogPostRepository.SaveAsync(post, token);
        _logger.LogInformation(
            "Successfully added comment by {Author} to {Slug}",
            comment.User,
            slug);
        return req.CreateResponse(HttpStatusCode.Created);
    }

    private class AddBlogPostCommentRequestBody
    {
        [Required]
        [MinLength(BlogPostComment.MinimumUserLength)]
        [MaxLength(BlogPostComment.MaximumUserLength)]
        public string? Author { get; set; }

        [Required]
        [MinLength(BlogPostComment.MinimumCommentLength)]
        [MaxLength(BlogPostComment.MaximumCommentLength)]
        public string? Text { get; set; }
    }
}