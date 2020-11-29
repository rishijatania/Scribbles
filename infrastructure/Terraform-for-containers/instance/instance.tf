resource "aws_instance" "instance" {
	ami = "${var.instance_ami}"
	instance_type = "${var.instance_type}"
	subnet_id = "${var.subnet_public_id}"
	vpc_security_group_ids = "${var.security_group_ids}"
	associate_public_ip_address = true
	key_name = "${var.key_pair_name}"
	ebs_block_device {
      device_name = "/dev/sda1"
      volume_type = "gp2"
      volume_size = "8"
    }

    # user_data = <<-EOF
    #           #!/bin/bash
    #           sudo echo export "Bucketname=${aws_s3_bucket.bucket.bucket}" >> /etc/environment
    #           sudo echo export "Bucketendpoint=${aws_s3_bucket.bucket.bucket_regional_domain_name}" >> /etc/environment
    #           sudo echo export "DBhost=${aws_db_instance.csye6225-su2020.address}" >> /etc/environment
    #           sudo echo export "DBendpoint=${aws_db_instance.csye6225-su2020.endpoint}" >> /etc/environment
    #           sudo echo export "DBname=${var.db_name}" >> /etc/environment
    #           sudo echo export "DBusername=${aws_db_instance.csye6225-su2020.username}" >> /etc/environment
    #           sudo echo export "DBpassword=${aws_db_instance.csye6225-su2020.password}" >> /etc/environment
    #           EOF
	tags = {
 		"Environment" = var.environment_tag
 	}
}

resource "aws_instance" "instance2" {
	ami = "${var.instance_ami}"
	instance_type = "${var.instance_type}"
	subnet_id = "${var.subnet_public_id}"
	vpc_security_group_ids = "${var.security_group_ids}"
	associate_public_ip_address = true
	key_name = "${var.key_pair_name}"
	ebs_block_device {
      device_name = "/dev/sda1"
      volume_type = "gp2"
      volume_size = "8"
    }
	tags = {
 		"Environment" = var.environment_tag
 	}
}

# resource "aws_eip" "testInstanceEip" {
#  	vpc = true
# 	instance = "${aws_instance.instance.id}"
# 	tags = {
# 		"Environment" = var.environment_tag
# 	}
# }