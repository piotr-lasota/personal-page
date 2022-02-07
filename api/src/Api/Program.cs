using System.Text.Json;
using DataAccess;
using DataAccess.Repositories;
using Domain.Commands.AddBlogPostComment;
using Domain.Commands.DeleteBlogPostComments;
using Domain.Commands.RegisterBlogPost;
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

                    services.AddScoped<GetBlogPostCommentsQueryHandler>();
                    services.AddScoped<DeleteBlogPostCommentsCommandHandler>();
                    services.AddScoped<AddBlogPostCommentCommandHandler>();

                    services.AddScoped<RegisterBlogPostCommandHandler>();
                })
           .Build();

        host.Run();
    }
}