using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;

namespace DataAccess;

public static class ApplicationCosmosClient
{
    public static CosmosClient Build() =>
        new CosmosClientBuilder(
                Environment.GetEnvironmentVariable(
                    "COSMOSDB_CONNECTION_STRING"))
           .WithConnectionModeDirect()
           .WithSerializerOptions(new CosmosSerializationOptions
            {
                PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase,
                Indented = true,
            })
           .Build();
}