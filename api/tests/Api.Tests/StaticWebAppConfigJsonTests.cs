using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using Api.Authorization;
using FluentAssertions;
using Xunit;

namespace Api.Tests;

public class StaticWebAppConfigJsonTests
{
    public static IEnumerable<object[]> GetRolesConfiguredForTheApp()
    {
        var file = File.ReadAllText(
            Path.GetFullPath("../../../../../../frontend/staticwebapp.config.json"));

        var routesExtract = JsonSerializer.Deserialize<RoutesFocusedConfigFile>(
            file,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        if (routesExtract is null)
        {
            yield break;
        }

        foreach (var role in routesExtract.Routes.SelectMany(route => route.AllowedRoles))
        {
            yield return new object[] { role };
        }
    }

    [Theory]
    [MemberData(nameof(GetRolesConfiguredForTheApp))]
    public void EveryRoleConfiguredIsRecognisedInTheSystem(string role)
    {
        // Arrange
        var availableRoles = typeof(ApplicationRoles)
           .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
           .Where(fieldInfo => fieldInfo.IsLiteral && !fieldInfo.IsInitOnly)
           .Select(fieldInfo => typeof(ApplicationRoles)
                      .GetField(fieldInfo.Name)
                     !.GetRawConstantValue())
           .Cast<string>()
           .OrderBy(existingRole => existingRole)
           .ToHashSet();

        // Assert
        availableRoles.Should().Contain(role);
    }

    private class RoutesFocusedConfigFile
    {
        public IList<RouteConfigElement> Routes { get; set; } = new List<RouteConfigElement>();
    }

    private class RouteConfigElement
    {
        public IList<string> AllowedRoles { get; set; } = new List<string>();
    }
}