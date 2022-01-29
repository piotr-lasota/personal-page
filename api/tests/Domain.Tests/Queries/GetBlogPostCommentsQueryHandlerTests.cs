using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Errors;
using Domain.Models;
using Domain.Queries.GetBlogPostComments;
using Domain.Repositories;
using FluentAssertions;
using Moq;
using Xunit;

namespace Domain.Tests.Queries;

public class GetBlogPostCommentsQueryHandlerTests
{
    private readonly GetBlogPostCommentsQueryHandler _subject;

    private readonly Mock<IBlogPostRepository> _blogPostRepositoryMock = new ();
    private readonly BlogPost _existingBlogPost = new ("slug", DateTimeOffset.Now);

    public GetBlogPostCommentsQueryHandlerTests()
    {
        _existingBlogPost.AddComment(
            new BlogPostComment(
                "John Doe",
                "A comment",
                DateTimeOffset.Now));

        _blogPostRepositoryMock
           .Setup(blogPostRepository => blogPostRepository
                     .GetBySlugAsync(
                          _existingBlogPost.Slug,
                          It.IsAny<CancellationToken>()))
           .ReturnsAsync(_existingBlogPost);

        _subject = new GetBlogPostCommentsQueryHandler(_blogPostRepositoryMock.Object);
    }

    [Fact]
    public async Task ReturnsBlogPostComments()
    {
        // Arrange
        var query = new GetBlogPostCommentsQuery(_existingBlogPost.Slug);

        // Act
        var result = await _subject.Handle(query, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(_existingBlogPost.Comments);
    }

    [Fact]
    public async Task ReturnsNotFoundErrorIfPostDoesNotExist()
    {
        // Arrange
        var query = new GetBlogPostCommentsQuery("not-the-slug-of-any-existing-posts");

        // Act
        var queryResult = await _subject.Handle(query, CancellationToken.None);

        // Assert
        queryResult.IsSuccess.Should().BeFalse();
        queryResult.Errors.Should().HaveCount(1);
        queryResult.Errors.Single().Should().BeOfType<ResourceNotFoundError>();
    }
}