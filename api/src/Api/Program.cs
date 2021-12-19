using DataAccess.Repositories;
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
                    services.AddScoped<IBlogPostCommentRepository, BlogPostCommentRepository>();
                })
           .Build();

        host.Run();
    }
}