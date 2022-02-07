using System;
using System.Linq;
using Domain.Models;
using FluentAssertions;
using Xunit;

namespace Domain.Tests.Models;

public class BlogPostTests
{
    private readonly BlogPost _subject = new BlogPost("test-subject-blog-post");

    [Fact]
    public void NewBlogPostHasNoComments()
    {
        // Arrange
        var slug = "this-is-a-slug";

        // Act
        var blogPost = new BlogPost(slug);

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
        var creatingBlogPostWithCorrectSlug = () => new BlogPost(slug);

        // Assert
        creatingBlogPostWithCorrectSlug.Should().NotThrow();
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
        var creatingBlogPostWithIncorrectSlug = () => new BlogPost(slug);

        // Assert
        creatingBlogPostWithIncorrectSlug.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void AddCommentAddsAComment()
    {
        // Arrange
        var commentToAdd = new BlogPostComment(
            "Jane Dean",
            "Keep me here",
            DateTimeOffset.Now.AddDays(-2));

        // Act
        _subject.AddComment(commentToAdd);

        // Assert
        _subject.Comments.Should().HaveCount(1);
        _subject.Comments.Should().Contain(commentToAdd);
    }

    [Fact]
    public void RemoveCommentRemovesComment()
    {
        // Arrange
        var commentToKeep = new BlogPostComment(
            "Jane Dean",
            "Keep me here",
            DateTimeOffset.Now.AddDays(-2));
        var commentToDelete = new BlogPostComment(
            "John Doe",
            "Delete me, please",
            DateTimeOffset.Now.AddDays(-1));

        _subject.AddComment(commentToKeep);
        _subject.AddComment(commentToDelete);

        // Act
        _subject.RemoveComment(commentToDelete);

        // Assert
        _subject.Comments.Should().HaveCount(1);
        _subject.Comments.Should().NotContain(commentToDelete);
        _subject.Comments.Should().Contain(commentToKeep);
    }

    [Fact]
    public void CommentsAreReturnedChronologically()
    {
        // Arrange & Act
        var earlierComment = new BlogPostComment(
            "Jane Dean",
            "I was first",
            DateTimeOffset.Now.AddDays(-5));

        var middleComment = new BlogPostComment(
            "Mia Walker",
            "I was in the middle",
            DateTimeOffset.Now.AddDays(-3));

        var latestComment = new BlogPostComment(
            "John Doe",
            "I was the last one",
            DateTimeOffset.Now.AddDays(-1));

        _subject.AddComment(middleComment);
        _subject.AddComment(latestComment);
        _subject.AddComment(earlierComment);

        // Assert
        _subject.Comments.Should().HaveCount(3);
        _subject.Comments.Last().Should().Be(earlierComment);
        _subject.Comments.First().Should().Be(latestComment);
    }
}