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