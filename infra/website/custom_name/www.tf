resource "azurerm_static_site_custom_domain" "www-cname" {
  static_site_id  = var.static_site_id
  domain_name     = "${azurerm_dns_cname_record.www-cname.name}.${local.website_domain_name}"
  validation_type = "cname-delegation"
}

resource "azurerm_dns_cname_record" "www-cname" {
  name                = "www"
  zone_name           = var.zone_name
  resource_group_name = var.resource_group_name
  ttl                 = var.ttl
  record              = var.static_site_default_hostname
}
