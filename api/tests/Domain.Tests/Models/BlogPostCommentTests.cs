using System;
using System.Linq;
using Domain.Models;
using FluentAssertions;
using Xunit;

namespace Domain.Tests.Models;

public class BlogPostCommentTests
{
    [Theory]
    [InlineData(0)]
    [InlineData(1001)]
    public void TextLengthIsEnforced(int commentLength)
    {
        // Assert
        var commentText = new string(Enumerable.Repeat('a', commentLength).ToArray());

        // Act
        var invalidTextLengthCommentCreationResult =
            BlogPostComment.Create("User", commentText, DateTimeOffset.Now);

        // Assert
        invalidTextLengthCommentCreationResult.IsFailed.Should().BeTrue();
        invalidTextLengthCommentCreationResult.Errors.Should().NotBeEmpty();
    }

    [Theory]
    [InlineData(2)]
    [InlineData(101)]
    public void UserLengthIsEnforced(int commentLength)
    {
        // Assert
        var user = new string(Enumerable.Repeat('a', commentLength).ToArray());

        // Act
        var invalidUserLengthCommentCreationResult =
            BlogPostComment.Create(user, "Some valid comment", DateTimeOffset.Now);

        // Assert
        invalidUserLengthCommentCreationResult.IsFailed.Should().BeTrue();
        invalidUserLengthCommentCreationResult.Errors.Should().NotBeEmpty();
    }
}