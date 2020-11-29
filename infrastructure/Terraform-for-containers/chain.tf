provider "aws" {
	region  = "${var.region}"
	profile = "${var.profile}"
}
module "networkModule" {
	source          = "./network"
	region          = "${var.region}"
	environment_tag = "${var.environment_tag}"
}
module "securityGroupModule" {
	source          = "./securityGroup"
	region          = "${var.region}"
	vpc_id          = "${module.networkModule.vpc_id}"
	environment_tag = "${var.environment_tag}"
}
module "instanceModule" {
	source             = "./instance"
	region             = "${var.region}"
	instance_ami       = "${var.instance_ami}"
	vpc_id             = "${module.networkModule.vpc_id}"
	subnet_public_id   = "${module.networkModule.public_subnets[0]}"
	key_pair_name      = "${var.key_pair_name}"
	security_group_ids = ["${module.securityGroupModule.sg_22}", "${module.securityGroupModule.sg_80}","${module.securityGroupModule.sg_8085}"]
	environment_tag    = "${var.environment_tag}"
}
module "provisionModule" {
	source    = "./provision"
	public_ip = "${module.instanceModule.public_ip}"
	public_ip2 = "${module.instanceModule.public_ip2}"
	public_dns = "${module.instanceModule.public_dns}"
	public_dns2 = "${module.instanceModule.public_dns2}"
	ssh_user  = "${var.ssh_user}"
	private_key = "${var.private_key}"
	WEBAPP_URL = "${var.WEBAPP_URL}"
	DB_NAME = "${var.DB_NAME}"
	CONNECTION_URI = "${var.CONNECTION_URI}"
	ssh_port  = "22"
}
