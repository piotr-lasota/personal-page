resource "azurerm_dns_zone" "homepage" {
  name                = local.website_domain_name
  resource_group_name = var.resource_group_name
}