using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Errors;
using Domain.Models;
using Domain.Queries.GetBlogPostComments;
using Domain.Repositories;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Domain.Tests.Queries;

public class GetBlogPostCommentsQueryHandlerTests
{
    private readonly GetBlogPostCommentsQueryHandler _subject;

    private readonly Mock<IBlogPostRepository> _blogPostRepositoryMock = new ();
    private readonly BlogPost _existingBlogPost = BlogPost.Create("slug").Value;

    public GetBlogPostCommentsQueryHandlerTests()
    {
        var existingComment = BlogPostComment.Create(
                "John Doe",
                "A comment",
                DateTimeOffset.Now)
           .Value;

        _existingBlogPost.AddComment(existingComment);

        _blogPostRepositoryMock
           .Setup(blogPostRepository => blogPostRepository
                     .GetBySlugAsync(
                          _existingBlogPost.Slug,
                          It.IsAny<CancellationToken>()))
           .ReturnsAsync(_existingBlogPost);

        _subject = new GetBlogPostCommentsQueryHandler(
            new Mock<ILogger<GetBlogPostCommentsQueryHandler>>().Object,
            _blogPostRepositoryMock.Object);
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
        queryResult.Errors.Should()
           .HaveCount(1)
           .And.Subject.Single()
           .Should()
           .BeOfType<ResourceNotFoundError>();
    }
}