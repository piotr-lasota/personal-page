using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Commands.DeleteBlogPostComments;
using Domain.Errors;
using Domain.Models;
using Domain.Repositories;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Domain.Tests.Commands;

public class DeleteBlogPostCommentsCommandHandlerTests
{
    private readonly DeleteBlogPostCommentsCommandHandler _subject;

    private readonly Mock<IBlogPostRepository> _blogPostRepositoryMock = new ();

    private readonly BlogPost _existingBlogPost = new ("slug");
    private readonly List<BlogPostComment> _comments = new ();

    public DeleteBlogPostCommentsCommandHandlerTests()
    {
        _blogPostRepositoryMock
           .Setup(blogPostRepository => blogPostRepository
                     .GetBySlugAsync(
                          _existingBlogPost.Slug,
                          It.IsAny<CancellationToken>()))
           .ReturnsAsync(_existingBlogPost);

        _subject = new DeleteBlogPostCommentsCommandHandler(
            new Mock<ILogger<DeleteBlogPostCommentsCommandHandler>>().Object,
            _blogPostRepositoryMock.Object);
    }

    [Fact]
    public async Task RemovesSpecifiedCommentsFromBlogPost()
    {
        // Arrange
        var firstCommentToBeDeleted =
            new BlogPostComment(
                "John",
                "I don't like this post",
                DateTimeOffset.Now.AddDays(-1));

        var secondCommentToBeDeleted = new BlogPostComment(
            "Misha",
            "I don't like the author",
            DateTimeOffset.Now.AddDays(-2));

        var commentToKeep = new BlogPostComment(
            "Misha",
            "OMG everything is awesome",
            DateTimeOffset.Now.AddDays(-3));

        _existingBlogPost.AddComment(firstCommentToBeDeleted);
        _existingBlogPost.AddComment(secondCommentToBeDeleted);
        _existingBlogPost.AddComment(commentToKeep);

        var command = new DeleteBlogPostCommentsCommand(
            _existingBlogPost.Slug,
            new HashSet<Guid>
            {
                firstCommentToBeDeleted.Id,
                secondCommentToBeDeleted.Id,
            });

        // Act
        var result = await _subject.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();

        _existingBlogPost.Comments.Should().NotContain(firstCommentToBeDeleted);
        _existingBlogPost.Comments.Should().NotContain(secondCommentToBeDeleted);
        _existingBlogPost.Comments.Should().Contain(commentToKeep);

        _blogPostRepositoryMock
           .Verify(repository =>
                       repository.SaveAsync(
                           _existingBlogPost,
                           It.IsAny<CancellationToken>()));
    }

    [Fact]
    public async Task ReturnsNotFoundErrorWhenBlogPostDoesNotExist()
    {
        // Arrange
        var command = new DeleteBlogPostCommentsCommand(
            "this-post-does-not-exist",
            new HashSet<Guid>
            {
                Guid.NewGuid(),
            });

        // Act
        var result = await _subject.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();

        result.Errors.Should().HaveCount(1);
        result.Errors.Single()
           .Should()
           .BeOfType<ResourceNotFoundError>();
    }

    [Fact]
    public async Task ReturnsNotFoundErrorWhenAnyCommentDoesNotExist()
    {
        // Arrange
        var existingComment =
            new BlogPostComment(
                "John",
                "I don't like this post",
                DateTimeOffset.Now.AddDays(-1));

        var nonExistingCommentId = Guid.NewGuid();

        var command = new DeleteBlogPostCommentsCommand(
            _existingBlogPost.Slug,
            new HashSet<Guid>
            {
                existingComment.Id,
                nonExistingCommentId,
            });

        // Act
        var result = await _subject.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();

        result.Errors.Should().HaveCount(1);
        result.Errors.Single()
           .Should()
           .BeOfType<ResourceNotFoundError>();
    }
}