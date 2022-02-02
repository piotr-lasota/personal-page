resource "azurerm_cosmosdb_account" "cosmos" {
  location                   = var.location
  name                       = format("cosmos-%s", local.resources_core_name)
  offer_type                 = "Standard"
  kind                       = "GlobalDocumentDB"
  resource_group_name        = var.resource_group_name
  analytical_storage_enabled = false

  backup {
    type                = "Periodic"
    storage_redundancy  = "Geo"
    retention_in_hours  = 8
    interval_in_minutes = 240
  }

  consistency_policy {
    consistency_level       = "Session"
    max_interval_in_seconds = 5
    max_staleness_prefix    = 100
  }

  geo_location {
    failover_priority = 0
    location          = var.location
    zone_redundant    = false
  }

  capabilities {
    name = "EnableServerless"
  }
}

locals {
  databases = {
    production  = null
    development = null
  }
}

resource "azurerm_cosmosdb_sql_database" "blog" {
  for_each = local.databases

  name                = "blog-${each.key}"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.cosmos.name
}

resource "azurerm_cosmosdb_sql_container" "blogPost" {
  for_each = local.databases

  name                = "blogPosts"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.cosmos.name
  database_name       = azurerm_cosmosdb_sql_database.blog[each.key].name
  partition_key_path  = "/slug"
}