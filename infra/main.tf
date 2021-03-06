terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>2.90"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-terraform-resources"
    storage_account_name = "piotrlasotaprivatetfdata"
    container_name       = "piotr-lasota-dev-tfstate"
    key                  = "piotr-lasota.dev.tfstate"
  }
}

provider "azurerm" {
  features {}
}

module "homepage" {
  source               = "./website"
  resource_group_name  = azurerm_resource_group.homepage.name
  environment          = var.environment
  environment_number   = var.environment_number
  location             = var.azure_location
  second_level_domain  = var.second_level_domain
  top_level_domain     = var.top_level_domain
  txt_validation_token = var.txt_validation_token

  azurerm_static_site_app_insights_tags = {
    app_insights_resource_id = azurerm_application_insights.website.id
    instrumentation_key      = azurerm_application_insights.website.instrumentation_key
  }
}