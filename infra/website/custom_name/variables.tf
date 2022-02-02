variable "static_site_id" {
  description = "Id of the Azure Static Website"
  type        = string
}

variable "static_site_default_hostname" {
  description = "Default hostname of the Azure Static Website"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the Resource Group"
  type        = string
}

variable "zone_name" {
  description = "Name of the Azure DNS Zone"
  type        = string
}

variable "ttl" {
  description = "Time To Live"
  type        = number
  default     = 3600
}

variable "second_level_domain" {
  description = "Target second level domain"
  type        = string
}

variable "top_level_domain" {
  description = "Target top level domain"
  type        = string
}

variable "txt_validation_token" {
  description = "Manual override of the Custom Domain TXT validation token until https://github.com/hashicorp/terraform-provider-azurerm/issues/14750 is fixed"
  type        = string
  nullable    = true
  default     = null
  sensitive   = true
}