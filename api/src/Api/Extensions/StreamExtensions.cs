using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Api.Extensions;

public static class StreamExtensions
{
    public static async Task<(bool, TExpected?)>
        TryDeserializeToValidType<TExpected>(
            this Stream stream,
            CancellationToken cancellationToken)
    {
        var deserializationResult = await DeserializeToTypeOrDefaultAsync<TExpected>(
            stream,
            cancellationToken);

        if (deserializationResult is null)
        {
            return (false, default);
        }

        var results = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(
            deserializationResult,
            new ValidationContext(deserializationResult, null, null),
            results,
            true);

        return isValid
            ? (true, deserializationResult)
            : (false, default);
    }

    private static async Task<TExpected?> DeserializeToTypeOrDefaultAsync<TExpected>(
        Stream stream,
        CancellationToken cancellationToken)
    {
        try
        {
            return await JsonSerializer.DeserializeAsync<TExpected>(
                stream,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                },
                cancellationToken);
        }
        catch (JsonException)
        {
            return default;
        }
    }
}