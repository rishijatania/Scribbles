variable "region" {
 default = "us-east-1a"
}
variable "vpc_id" {
 description = "VPC id"
}
variable "environment_tag" {
 description = "Environment tag" 
 default = ""
}