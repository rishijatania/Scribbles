variable "region" {
	description = "Aws region"
  	default 	= "us-east-1"
}
variable "profile" {
	description = "Aws cli profile"
  	default 	= "default"
}
variable "availability_zone" {
	description = "Availability Zone"
  	default 	= "us-east-1a"
}
variable "environment_tag" {
  	description = "Environment tag"
  	default 	= ""
}
variable "key_pair_name" {
  description = "AWS KEY NAME"
}
variable "ssh_user" {
  description = "SSh User name"
}

variable "private_key" {
  description = "Private key"
}

variable "CONNECTION_URI" {
  description = "SSh User name"
}

variable "DB_NAME" {
  description = "SSh User name"
}

variable "WEBAPP_URL" {
  description = "SSh User name"
}

variable "instance_ami" {
	description = "Ami instance"
}