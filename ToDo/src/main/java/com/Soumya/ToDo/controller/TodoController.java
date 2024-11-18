package com.Soumya.ToDo.controller;

import com.Soumya.ToDo.entity.TodoDetails;
import com.Soumya.ToDo.entity.TodoEntity;
import com.Soumya.ToDo.services.JwtUtil;
import com.Soumya.ToDo.services.TodoService;
import com.Soumya.ToDo.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {
    @Autowired
    private UserServices userServices;
    @Autowired
    private TodoService todoService;
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/add-todo")
    public String addTodo(@RequestBody TodoEntity todo, @RequestHeader(value = "Authorization") String authHeader){
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)){
                int id = jwtUtil.extractUserId(token);

                if (todoService.addTodo(id,todo) != null)
                    return "Todo Added";
                else
                    return "Error occurred while adding todo";
            }
            else {
                return "Invalid token";
            }
        }
        return "Authorization header is missing or malformed!";
    }

    @GetMapping("/my-todo")
    public List<TodoEntity> getAllTodos(@RequestHeader(value = "Authorization") String authHeader) {
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                int userId = jwtUtil.extractUserId(token);
                return todoService.getAllTodos(userId);
            }
            else {
                throw new RuntimeException("Invalid Token...");
            }
        }
        else {
            throw new RuntimeException("Invalid Token! please log in to access..");
        }
    }

    @PostMapping("/deletetodo")
    public ResponseEntity<?> deleteById(@RequestHeader(value = "Authorization") String authHeader, @RequestBody TodoDetails todoDetails){
        try {
            if(authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                if (jwtUtil.validateToken(token)) {
                    todoService.deleteById(todoDetails.getId());
                    return ResponseEntity.status(HttpStatus.OK).body("Todo Deleted");
                }
                else {
                    throw new RuntimeException("Invalid Token...");
                }
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or token malformed");
            }

        }catch (Exception err){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: "+ err.getMessage());
        }
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<?> updateStatus(@RequestBody TodoDetails todoDetails){
        try{
            todoService.updateStatus(todoDetails.getId());
            return ResponseEntity.status(HttpStatus.OK).body("Updated todo status");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error: "+e.getMessage());
        }
    }
}
