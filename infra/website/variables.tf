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

variable "app_insights_instrumentation_key" {
  description = "Azure Application Insights instrumentation key"
  type        = string
  nullable    = false
}

variable "app_insights_resource_id" {
  description = "Azure Application Insights resource id"
  type        = string
  nullable    = false
}