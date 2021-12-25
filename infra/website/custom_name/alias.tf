resource "azurerm_dns_a_record" "root" {
  name                = "@"
  zone_name           = var.zone_name
  resource_group_name = var.resource_group_name
  ttl                 = var.ttl
  target_resource_id  = var.static_site_id
}