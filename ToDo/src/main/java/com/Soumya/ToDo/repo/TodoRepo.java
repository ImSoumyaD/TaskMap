package com.Soumya.ToDo.repo;

import com.Soumya.ToDo.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepo extends JpaRepository<TodoEntity,Integer> {
    List<TodoEntity> findTodosByUserId(int userId);
}
