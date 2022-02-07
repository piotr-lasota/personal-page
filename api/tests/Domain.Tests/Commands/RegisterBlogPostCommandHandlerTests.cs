using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Commands.RegisterBlogPost;
using Domain.Models;
using Domain.Repositories;
using Domain.Successes;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Domain.Tests.Commands;

public class RegisterBlogPostCommandHandlerTests
{
    private readonly RegisterBlogPostCommandHandler _subject;

    private readonly Mock<IBlogPostRepository> _blogPostRepositoryMock = new ();

    private readonly BlogPost _existingBlogPost = BlogPost.Create("this-post-already-exists").Value;

    public RegisterBlogPostCommandHandlerTests()
    {
        _blogPostRepositoryMock
           .Setup(blogPostRepository => blogPostRepository
                     .GetBySlugAsync(
                          _existingBlogPost.Slug,
                          It.IsAny<CancellationToken>()))
           .ReturnsAsync(_existingBlogPost);

        _subject = new RegisterBlogPostCommandHandler(
            new Mock<ILogger<RegisterBlogPostCommandHandler>>().Object,
            _blogPostRepositoryMock.Object);
    }

    [Fact]
    public async Task RegistersAPostIfItDoesNotExist()
    {
        // Arrange
        var command = new RegisterBlogPostCommand("this-post-does-not-exist-yet");

        // Act
        var result = await _subject.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Successes.Should().HaveCount(1);
        result.Successes.Single().Should().BeOfType<SuccessfullyCreated>();

        _blogPostRepositoryMock
           .Verify(blogPostRepository =>
                       blogPostRepository.SaveAsync(
                           It.Is<BlogPost>(blogPost => blogPost.Slug == command.Slug),
                           It.IsAny<CancellationToken>()));
    }

    [Fact]
    public async Task DoesNothingIfThePostExistsAlready()
    {
        // Arrange
        var command = new RegisterBlogPostCommand(_existingBlogPost.Slug);

        // Act
        var result = await _subject.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Successes.Should().HaveCount(1);
        result.Successes.Single().Should().BeOfType<AlreadyExisted>();
    }
}