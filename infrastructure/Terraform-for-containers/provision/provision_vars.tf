# Variables   
variable "private_key" {
  description = "The EC2 Key Pair to associate with the EC2 Instance for SSH access."
}

variable "region" {
  description = "The AWS region to deploy into"
  default     = "us-east-1"
}

variable "instance_id" {
  description = "The instance id for the EC2 Instance."
  default     = ""
}

variable "public_ip" {
  description = "Public IP for EC2 instance"
  default     = ""
}

variable "public_dns" {
  description = "Public DNS for EC2 instance"
  default     = ""
}

variable "public_ip2" {
  description = "Public IP for EC2 instance"
  default     = ""
}

variable "public_dns2" {
  description = "Public DNS for EC2 instance"
  default     = ""
}

variable "ssh_port" {
  description = "The port the EC2 Instance should listen on for SSH requests."
  default     = 22
}

variable "ssh_user" {
  description = "SSH user name to use for remote exec connections,"
  default     = "centos"
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