locals {
  website_domain_name = format("%s.%s", var.second_level_domain, var.top_level_domain)
  resources_core_name = format("%s-%s-%s-%03d", var.second_level_domain, var.top_level_domain, var.environment, var.environment_number)
}