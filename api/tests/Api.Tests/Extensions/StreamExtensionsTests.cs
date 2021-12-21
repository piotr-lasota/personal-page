using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Api.Extensions;
using FluentAssertions;
using Xunit;

namespace Api.Tests.Extensions;

public class StreamExtensionsTests
{
    private string _streamUtf8Content = string.Empty;

    private Stream Stream => new MemoryStream(Encoding.UTF8.GetBytes(_streamUtf8Content));

    [Fact]
    public async Task SuccessfullyDeserializesToTargetType()
    {
        // Arrange
        _streamUtf8Content = @"{""number"":3,""text"":""some magic text""}";

        // Act
        var (succeeded, someClass) = await Stream
           .TryDeserializeToValidType<SomeClass>(CancellationToken.None);

        // Assert
        succeeded.Should().BeTrue();
        someClass.Should()
           .BeEquivalentTo(
                new SomeClass
                {
                    Number = 3,
                    Text = "some magic text",
                });
    }

    [Fact]
    public async Task SuccessfullyDeserializesToTargetCollectionType()
    {
        // Arrange
        _streamUtf8Content = @"[{""number"":3,""text"":""some magic text""}]";

        // Act
        var (succeeded, list) = await Stream
           .TryDeserializeToValidType<IList<SomeClass>>(CancellationToken.None);

        // Assert
        succeeded.Should().BeTrue();
        list.Should()
           .BeEquivalentTo(
                new List<SomeClass>
                {
                    new ()
                    {
                        Number = 3,
                        Text = "some magic text",
                    },
                });
    }

    [Theory]
    [InlineData(@"")]
    [InlineData(@"not a json string")]
    [InlineData(@"()")]
    [InlineData(@"{""text"":""some magic text""}")]
    [InlineData(@"{""number"":""not a number"",""text"":""some magic text""}")]
    [InlineData(@"{""number"":3,""text"":123}")]
    [InlineData(@"{""number"":123,""text"":""some magic text""}")]
    public async Task FailsWithStreamThatIsNotJsonOfValidType(string utf8Stream)
    {
        // Arrange
        _streamUtf8Content = utf8Stream;

        // Act
        var (succeeded, someClass) = await Stream
               .TryDeserializeToValidType<
                    SomeClass>(CancellationToken
                   .None);

        // Assert
        succeeded.Should().BeFalse();
        someClass.Should().BeNull();
    }

    private class SomeClass
    {
        [Required]
        [Range(0, 100)]
        public uint? Number { get; set; }

        [Required]
        public string? Text { get; set; }
    }
}