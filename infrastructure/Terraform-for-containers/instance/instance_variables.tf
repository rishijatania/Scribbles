variable "region" {
 default = "us-east-1"
}

variable "vpc_id" {
 description = "VPC id"
}

variable "subnet_public_id" {
 description = "VPC public subnet id" 
}

variable "security_group_ids" {
 description = "EC2 security group"
 type = "list" 
}

variable "environment_tag" {
 description = "Environment tag" 
 default = ""
}

variable "instance_ami" {
 description = "EC2 instance ami"
}

variable "key_pair_name" {
 description = "EC2 instance ami"
}

variable "instance_type" {
 description = "EC2 instance type" 
 default = "t2.micro"
}
