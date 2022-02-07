using System;
using System.Linq;
using Domain.Models;
using FluentAssertions;
using Xunit;

namespace Domain.Tests.Models;

public class BlogPostTests
{
    private readonly BlogPost _subject = BlogPost.Create("test-subject-blog-post").Value;

    [Fact]
    public void NewBlogPostHasNoComments()
    {
        // Arrange
        var slug = "this-is-a-slug";

        // Act
        var blogPost = BlogPost.Create(slug).Value;

        // Assert
        blogPost.Slug.Should().Be(slug);
        blogPost.Comments.Should().BeEmpty();
    }

    [Theory]
    [InlineData("this-is-a-correct-slug")]
    [InlineData("it-can-contain-123-numbers")]
    [InlineData("123")]
    public void BlogPostAcceptsSlugsInCorrectFormat(string slug)
    {
        // Act
        var createPostWithCorrectSlug = BlogPost.Create(slug);

        // Assert
        createPostWithCorrectSlug.IsSuccess.Should().BeTrue();
    }

    [Theory]
    [InlineData("")]
    [InlineData("12")]
    [InlineData("this_contains_invalid_characters")]
    [InlineData("This-Is-Mixed-Case")]
    [InlineData(
        "this-is-longer-than-100-characters-as-it-is-actually-101-characters-1234567890-1234567890-12345678901")]
    public void BlogPostThrowsIfSlugIsNotInCorrectFormat(string slug)
    {
        // Act
        var createPostWithIncorrectSlug = BlogPost.Create(slug);

        // Assert
        createPostWithIncorrectSlug.IsFailed.Should().BeTrue();
        createPostWithIncorrectSlug.Errors.Should().NotBeEmpty();
    }

    [Fact]
    public void AddCommentAddsAComment()
    {
        // Arrange
        var commentToAdd = BlogPostComment.Create(
                "Jane Dean",
                "Keep me here",
                DateTimeOffset.Now.AddDays(-2))
           .Value;

        // Act
        var additionResult = _subject.AddComment(commentToAdd);

        // Assert
        additionResult.IsSuccess.Should().BeTrue();
        _subject.Comments.Should().HaveCount(1);
        _subject.Comments.Should().Contain(commentToAdd);
    }

    [Fact]
    public void RemoveCommentRemovesComment()
    {
        // Arrange
        var commentToKeep = BlogPostComment.Create(
                "Jane Dean",
                "Keep me here",
                DateTimeOffset.Now.AddDays(-2))
           .Value;

        var commentToDelete = BlogPostComment.Create(
                "John Doe",
                "Delete me, please",
                DateTimeOffset.Now.AddDays(-1))
           .Value;

        _subject.AddComment(commentToKeep);
        _subject.AddComment(commentToDelete);

        // Act
        var removalResult = _subject.RemoveComment(commentToDelete);

        // Assert
        removalResult.IsSuccess.Should().BeTrue();
        _subject.Comments.Should().HaveCount(1);
        _subject.Comments.Should().NotContain(commentToDelete);
        _subject.Comments.Should().Contain(commentToKeep);
    }

    [Fact]
    public void RemoveCommentFailsToRemoveCommentNotOnPost()
    {
        // Arrange
        var existingComment = BlogPostComment.Create(
                "Jane Dean",
                "Keep me here",
                DateTimeOffset.Now.AddDays(-2))
           .Value;

        var commentToDeleteThatIsNotOnPost = BlogPostComment.Create(
                "John Doe",
                "Delete me, please",
                DateTimeOffset.Now.AddDays(-1))
           .Value;

        _subject.AddComment(existingComment);

        // Act
        var removalResult = _subject.RemoveComment(commentToDeleteThatIsNotOnPost);

        // Assert
        removalResult.IsFailed.Should().BeTrue();
        removalResult.Errors.Should()
           .HaveCount(1)
           .And.Subject.Single()
           .Metadata.Should()
           .ContainKey("commentId")
           .WhoseValue.Should()
           .Be(commentToDeleteThatIsNotOnPost.Id);

        _subject.Comments.Should().HaveCount(1);
        _subject.Comments.Should().NotContain(commentToDeleteThatIsNotOnPost);
        _subject.Comments.Should().Contain(existingComment);
    }

    [Fact]
    public void CommentsAreReturnedChronologically()
    {
        // Arrange & Act
        var earlierComment = BlogPostComment.Create(
                "Jane Dean",
                "I was first",
                DateTimeOffset.Now.AddDays(-5))
           .Value;

        var middleComment = BlogPostComment.Create(
                "Mia Walker",
                "I was in the middle",
                DateTimeOffset.Now.AddDays(-3))
           .Value;

        var latestComment = BlogPostComment.Create(
                "John Doe",
                "I was the last one",
                DateTimeOffset.Now.AddDays(-1))
           .Value;

        _subject.AddComment(middleComment);
        _subject.AddComment(latestComment);
        _subject.AddComment(earlierComment);

        // Assert
        _subject.Comments.Should().HaveCount(3);
        _subject.Comments.Last().Should().Be(earlierComment);
        _subject.Comments.First().Should().Be(latestComment);
    }
}