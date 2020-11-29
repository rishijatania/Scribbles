resource "null_resource" "example_provisioner" {
  // linux
  connection {
    type        = "ssh"
    host        = "${var.public_ip}"
    user        = "${var.ssh_user}"
    password    = ""
    port        = "${var.ssh_port}"
    private_key = "${file("${var.private_key}")}"
  }
  // docker login pull image from docker hub and run it
  provisioner "file" {
    content     = "CONNECTION_URI=${var.CONNECTION_URI}\nDB_NAME=${var.DB_NAME}\n"
    destination = ".env"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo docker pull rishijatania/todo-backend",
      "sudo docker run --env-file .env -p 8080:8080 -d rishijatania/todo-backend",
	  ]
  }

}

resource "null_resource" "example_provisioner2" {
  // linux
  connection {
    type        = "ssh"
    host        = "${var.public_ip2}"
    user        = "${var.ssh_user}"
    password    = ""
    port        = "${var.ssh_port}"
    private_key = "${file("${var.private_key}")}"
  }
  // docker login pull image from docker hub and run it
  provisioner "file" {
    content     = "REACT_APP_WEBAPP_URL=http://${var.public_dns}:8080/api/todolist\nNODE_ENV=prod\nREACT_APP_MIDDLEWARE_URL=http://${var.public_dns}:8080/api/todolist"
    destination = ".env"
  }

  provisioner "remote-exec" {
    inline = [
	  "sudo docker pull rishijatania/todo-frontend",
      "sudo docker run --env-file .env -p 8085:80 -d rishijatania/todo-frontend", 
	  ]
  }

}