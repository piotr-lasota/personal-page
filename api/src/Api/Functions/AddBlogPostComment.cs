using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Extensions;
using Domain.Commands.AddBlogPostComment;
using Domain.Errors;
using Domain.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions;

public class AddBlogPostComment
{
    private readonly ILogger<AddBlogPostComment> _logger;
    private readonly AddBlogPostCommentCommandHandler _handler;

    public AddBlogPostComment(
        ILogger<AddBlogPostComment> logger,
        AddBlogPostCommentCommandHandler handler)
    {
        _logger = logger;
        _handler = handler;
    }

    [Function(nameof(AddBlogPostComment))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "blog/posts/{slug}/comments")]
        HttpRequestData req,
        string slug)
    {
        var cancellationTokenSource = new CancellationTokenSource();
        var token = cancellationTokenSource.Token;

        var (ok, addBlogPostRequest) = await req.Body
           .TryDeserializingToValidTypeAsync<AddBlogPostCommentRequestBody>(token);

        if (!ok)
        {
            _logger.LogInformation("Invalid comment request provided");
            var response = req.CreateResponse(HttpStatusCode.BadRequest);
            return response;
        }

        var result = await _handler.Handle(
            new AddBlogPostCommentCommand(
                slug,
                addBlogPostRequest!.Author!,
                addBlogPostRequest.Text!),
            token);

        if (result.IsSuccess)
        {
            return req.CreateResponse(HttpStatusCode.Created);
        }

        return req.CreateResponse(result.HasError<ResourceNotFoundError>()
            ? HttpStatusCode.NotFound
            : HttpStatusCode.UnprocessableEntity);
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