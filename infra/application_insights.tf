resource "azurerm_log_analytics_workspace" "homepage" {
  name                = "law-${local.resources_core_name}"
  resource_group_name = azurerm_resource_group.homepage.name
  location            = azurerm_resource_group.homepage.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  daily_quota_gb      = 1
}

resource "azurerm_application_insights" "website" {
  name                                = "ai-${local.resources_core_name}"
  force_customer_storage_for_profiler = false
  application_type                    = "web"
  location                            = azurerm_resource_group.homepage.location
  resource_group_name                 = azurerm_resource_group.homepage.name
  workspace_id                        = azurerm_log_analytics_workspace.homepage.id
  retention_in_days                   = azurerm_log_analytics_workspace.homepage.retention_in_days
}