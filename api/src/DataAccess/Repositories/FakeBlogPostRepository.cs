using System.Collections.Concurrent;
using Domain.Models;
using Domain.Repositories;
using Microsoft.Extensions.Logging;

namespace DataAccess.Repositories;

public class FakeBlogPostRepository : IBlogPostRepository
{
    private readonly ILogger<FakeBlogPostRepository> _logger;

    private readonly ConcurrentDictionary<string, BlogPost> _blogPosts =
        new (Environment.ProcessorCount, 100);

    public FakeBlogPostRepository(
        ILogger<FakeBlogPostRepository> logger)
    {
        _logger = logger;

        var fakeBlogPost = BlogPost.Create(
                "getting-contentful-to-work")
           .Value;

        fakeBlogPost.AddComment(BlogPostComment.Create(
                "johnDoe123",
                "OMG Great post, so much true!",
                DateTimeOffset.Now.AddDays(-1))
           .Value);

        fakeBlogPost.AddComment(BlogPostComment.Create(
                "Bill Gates",
                "Dude, so much inspiration! Come join M$!",
                DateTimeOffset.Now.AddDays(-2).AddHours(4))
           .Value);

        _blogPosts.AddOrUpdate(
            fakeBlogPost.Slug,
            fakeBlogPost,
            (_, post) => post);
    }

    public async Task<BlogPost?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        await Task.Delay(100, cancellationToken);
        var wasFound = _blogPosts.TryGetValue(slug, out var blogPost);

        if (wasFound)
        {
            _logger.LogInformation(
                "Post {Slug} found",
                slug);
        }
        else
        {
            _logger.LogInformation(
                "Post {Slug} not found",
                slug);
        }

        return blogPost;
    }

    public async Task SaveAsync(BlogPost blogPost, CancellationToken cancellationToken)
    {
        await Task.Delay(100, cancellationToken);

        _logger.LogInformation("Saved post {Slug}", blogPost.Slug);

        _blogPosts.AddOrUpdate(blogPost.Slug, blogPost, (_, _) => blogPost);
    }
}