package com.devops.todoapp.Dao;

import com.devops.todoapp.Model.ToDoItem;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoItemRepository extends MongoRepository<ToDoItem,String> {
}
