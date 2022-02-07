using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Commands.AddBlogPostComment;
using Domain.Errors;
using Domain.Models;
using Domain.Repositories;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Domain.Tests.Commands;

public class AddBlogPostCommentCommandHandlerTests
{
    private readonly AddBlogPostCommentCommandHandler _subject;

    private readonly Mock<IBlogPostRepository> _blogPostRepositoryMock = new ();

    private readonly BlogPost _existingBlogPost = BlogPost.Create("slug").Value;

    public AddBlogPostCommentCommandHandlerTests()
    {
        _blogPostRepositoryMock
           .Setup(blogPostRepository => blogPostRepository
                     .GetBySlugAsync(
                          _existingBlogPost.Slug,
                          It.IsAny<CancellationToken>()))
           .ReturnsAsync(_existingBlogPost);

        _subject = new AddBlogPostCommentCommandHandler(
            new Mock<ILogger<AddBlogPostCommentCommandHandler>>().Object,
            _blogPostRepositoryMock.Object);
    }

    [Fact]
    public async Task AddsCommentToBlogPost()
    {
        // Arrange
        var command = new AddBlogPostCommentCommand(
            _existingBlogPost.Slug,
            "John Doe",
            "I like this blog");

        // Act
        var result = await _subject.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();

        _existingBlogPost.Comments.Should()
           .HaveCount(1)
           .And.ContainSingle(comment => comment.Text == command.Text &&
                                         comment.User == command.Author);

        _blogPostRepositoryMock
           .Verify(blogPostRepository =>
                       blogPostRepository.SaveAsync(
                           _existingBlogPost,
                           It.IsAny<CancellationToken>()));
    }

    [Fact]
    public async Task ReturnsNotFoundErrorWhenBlogPostDoesNotExist()
    {
        // Arrange
        var command = new AddBlogPostCommentCommand(
            "this-blog-post-does-not-exist",
            "John Doe",
            "I like this blog");

        // Act
        var result = await _subject.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Errors.Should()
           .HaveCount(1)
           .And.Subject.Single()
           .Should()
           .BeOfType<ResourceNotFoundError>();
    }
}