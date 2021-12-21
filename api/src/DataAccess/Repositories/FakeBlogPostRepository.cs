using System.Collections.Concurrent;
using Domain.Models;
using Domain.Repositories;

namespace DataAccess.Repositories;

public class FakeBlogPostRepository : IBlogPostRepository
{
    private readonly ConcurrentDictionary<string, BlogPost> _blogPosts = new (Environment.ProcessorCount, 100);

    public FakeBlogPostRepository()
    {
        var fakeBlogPost = new BlogPost(
            "how-to-azure-static-web-apps",
            DateTimeOffset.Now.AddDays(-5));

        fakeBlogPost.AddComment(new BlogPostComment(
            "johnDoe123",
            "OMG Great post, so much true!",
            DateTimeOffset.Now.AddDays(-1)));

        fakeBlogPost.AddComment(new BlogPostComment(
            "Bill Gates",
            "Dude, so much inspiration! Come join M$!",
            DateTimeOffset.Now.AddDays(-2).AddHours(4)));

        _blogPosts.AddOrUpdate(
            fakeBlogPost.Slug,
            fakeBlogPost,
            (_, post) => post);
    }

    public async Task<BlogPost?> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        await Task.Delay(100, cancellationToken);

        _blogPosts.TryGetValue(slug, out var blogPost);

        return blogPost;
    }

    public async Task SaveAsync(BlogPost blogPost, CancellationToken cancellationToken)
    {
        await Task.Delay(100, cancellationToken);
        _blogPosts.AddOrUpdate(blogPost.Slug, blogPost, (_, _) => blogPost);
    }
}