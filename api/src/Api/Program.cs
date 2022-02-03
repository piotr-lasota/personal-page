using System.Text.Json;
using DataAccess;
using DataAccess.Repositories;
using Domain.Commands.AddBlogPostComment;
using Domain.Commands.DeleteBlogPostComments;
using Domain.Queries.GetBlogPostComments;
using Domain.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api;

public static class Program
{
    public static void Main()
    {
        var host = new HostBuilder()
           .ConfigureFunctionsWorkerDefaults()
           .ConfigureServices(
                services =>
                {
                    services.Configure<JsonSerializerOptions>(
                        options => { options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase; });

                    services.AddSingleton(ApplicationCosmosClient.Build());

                    services.AddSingleton<
                        IBlogPostRepository,
                        CosmosDbBlogPostRepository>();

                    services.AddScoped<
                        GetBlogPostCommentsQueryHandler,
                        GetBlogPostCommentsQueryHandler>();

                    services.AddScoped<
                        DeleteBlogPostCommentsCommandHandler,
                        DeleteBlogPostCommentsCommandHandler>();

                    services.AddScoped<
                        AddBlogPostCommentCommandHandler,
                        AddBlogPostCommentCommandHandler>();
                })
           .Build();

        host.Run();
    }
}