resource "azurerm_static_site_custom_domain" "txt-root" {
  static_site_id  = var.static_site_id
  domain_name     = local.website_domain_name
  validation_type = "dns-txt-token"
}

resource "azurerm_dns_txt_record" "txt-root" {
  name                = "@"
  zone_name           = var.zone_name
  resource_group_name = var.resource_group_name
  ttl                 = var.ttl
  record {
    value = (azurerm_static_site_custom_domain.txt-root.validation_token != null && azurerm_static_site_custom_domain.txt-root.validation_token != "") ? azurerm_static_site_custom_domain.txt-root.validation_token : var.txt_validation_token
  }
}