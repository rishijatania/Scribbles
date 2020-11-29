package com.devops.todoapp.Model;

import java.util.Date;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ToDoItem {
	@Id
	private String id;
	private String description;
	private String owner;
	private boolean finished;
	private Date creationDate;

	public ToDoItem() {
	}

	public ToDoItem(String id, String description, String owner) {
		this.description = description;
		this.id = id;
		this.owner = owner;
		this.finished = false;
		this.creationDate = new Date();
	}

	public boolean isFinished() {
		return finished;
	}

	public void setFinish(boolean finished) {
		this.finished = finished;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getID() {
		return id;
	}

	public void setID(String id) {
		this.id = id;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this) {
			return true;
		}
		if (!(o instanceof ToDoItem)) {
			return false;
		}
		final ToDoItem group = (ToDoItem) o;
		return Objects.equals(this.getDescription(), group.getDescription())
				&& Objects.equals(this.getOwner(), group.getOwner()) && Objects.equals(this.getID(), group.getID());
	}

	@Override
	public int hashCode() {
		return Objects.hash(description, id, owner);
	}

	@Override
    public String toString() {
        if (id != null)
            return id + ": " + description;
        else return description;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
}