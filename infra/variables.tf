variable "azure_location" {
  description = "Location for the resource group and all it's resources"
  default     = "westeurope"
}

variable "second_level_domain" {
  description = "Target second level domain"
  type        = string
}

variable "top_level_domain" {
  description = "Target top level domain"
  type        = string
}

variable "environment" {
  description = "Environment suffix for resources (like \"prod\", \"staging\")"
  type        = string
}

variable "environment_number" {
  description = "Environment suffix for resource instance"
  type        = number
}
