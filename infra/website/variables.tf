variable "environment" {
  description = "Environment suffix for resources (like \"prod\", \"staging\")"
  type        = string
}

variable "environment_number" {
  description = "Environment suffix for resource instance"
  type        = number
}

variable "resource_group_name" {
  description = "Name of the Resource Group"
  type        = string
}

variable "location" {
  description = "Location"
  type        = string
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
}

variable "azurerm_static_site_app_insights_tags" {
  description = "Azure Application Insights secret tags"
  nullable    = false
  type = object({
    instrumentation_key : string,
    app_insights_resource_id : string
  })
}