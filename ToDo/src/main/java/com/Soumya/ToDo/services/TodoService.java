package com.Soumya.ToDo.services;

import com.Soumya.ToDo.entity.TodoEntity;
import com.Soumya.ToDo.entity.User;
import com.Soumya.ToDo.repo.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
    private UserServices userServices;
    @Autowired
    private TodoRepo todoRepo;
    @Autowired
    private JwtUtil jwtUtil;

    public TodoEntity addTodo(int userId, TodoEntity todo){
        Optional<User> user = userServices.findById(userId);
        todo.setUser(user.get());
        return todoRepo.save(todo);
    }

    public List<TodoEntity> getAllTodos(int userid){
        return todoRepo.findTodosByUserId(userid);
    }

    public void deleteById(int id){
        todoRepo.deleteById(id);
    }

    public TodoEntity updateStatus(int id){
        Optional<TodoEntity> byId = todoRepo.findById(id);
        TodoEntity todo = byId.get();
        if (todo.isStatus()){
            todo.setStatus("false");
        }else{
            todo.setStatus("true");
        }
        todoRepo.save(todo);
        return todo;
    }
}
