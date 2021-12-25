terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "2.90.0"
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

resource "azurerm_resource_group" "homepage" {
  name     = "rg-piotr-lasota.dev"
  location = var.azure_location
}

module "homepage" {
  source              = "./website"
  resource_group_name = azurerm_resource_group.homepage.name
  environment         = var.environment
  environment_number  = var.environment_number
  location            = var.azure_location
  second_level_domain = var.second_level_domain
  top_level_domain    = var.top_level_domain
}