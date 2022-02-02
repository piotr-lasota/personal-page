resource "azurerm_resource_group" "homepage" {
  name     = "rg-piotr-lasota.dev"
  location = var.azure_location
}

resource "azurerm_consumption_budget_resource_group" "homepage" {
  amount            = 30
  name              = "total_cost"
  resource_group_id = azurerm_resource_group.homepage.id

  time_period {
    start_date = "2022-02-01T00:00:00Z"
    end_date   = "2024-01-31T00:00:00Z"
  }

  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 50
    threshold_type = "Actual"
    contact_emails = [
      "lasota.piotr@gmail.com"
    ]
  }

  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 80
    threshold_type = "Actual"
    contact_emails = [
      "lasota.piotr@gmail.com"
    ]
  }

  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 50
    threshold_type = "Forecasted"
    contact_emails = [
      "lasota.piotr@gmail.com"
    ]
  }

  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 80
    threshold_type = "Forecasted"
    contact_emails = [
      "lasota.piotr@gmail.com"
    ]
  }
}