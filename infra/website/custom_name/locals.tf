locals {
  website_domain_name = format("%s.%s", var.second_level_domain, var.top_level_domain)
}