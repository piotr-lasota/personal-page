resource "azurerm_static_site" "website" {
  name                = format("app-%s", local.resources_core_name)
  resource_group_name = var.resource_group_name
  location            = var.location
  sku_size            = "Free"
  sku_tier            = "Free"

  tags = {
    "hidden-link: /app-insights-resource-id"        = var.azurerm_static_site_app_insights_tags.app_insights_resource_id
    #                              ↓ Azure really does this "instrmentation" vs "instrUmentation" typo
    "hidden-link: /app-insights-instrmentation-key" = var.azurerm_static_site_app_insights_tags.instrumentation_key
  }

  lifecycle {
    ignore_changes = [
      tags["hidden-link: /app-insights-resource-id"],
      tags["hidden-link: /app-insights-instrmentation-key"]
    ]
  }
}

module "custom_name" {
  source                       = "./custom_name"
  second_level_domain          = var.second_level_domain
  top_level_domain             = var.top_level_domain
  resource_group_name          = var.resource_group_name
  zone_name                    = azurerm_dns_zone.homepage.name
  static_site_id               = azurerm_static_site.website.id
  static_site_default_hostname = azurerm_static_site.website.default_host_name
  txt_validation_token         = var.txt_validation_token
}