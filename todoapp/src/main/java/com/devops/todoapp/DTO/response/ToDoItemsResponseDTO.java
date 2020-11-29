package com.devops.todoapp.DTO.response;

import java.util.List;

import com.devops.todoapp.Model.ToDoItem;

public class ToDoItemsResponseDTO {
	private List<ToDoItem> items;

	public List<ToDoItem> getItems() {
		return items;
	}

	public void setItems(List<ToDoItem> items) {
		this.items = items;
	}
}
