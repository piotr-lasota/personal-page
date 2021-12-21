using System.Text.Json;
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
                    services.Configure<JsonSerializerOptions>(
                        options => { options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase; });
                    services.AddSingleton<IBlogPostRepository, FakeBlogPostRepository>();
                })
           .Build();

        host.Run();
    }
}