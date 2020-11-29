output "public_ip" {
  value = "${aws_instance.instance.public_ip}"
}

output "public_dns" {
  value = "${aws_instance.instance.public_dns}"
}

output "public_ip2" {
  value = "${aws_instance.instance2.public_ip}"
}

output "public_dns2" {
  value = "${aws_instance.instance2.public_dns}"
}