package com.Soumya.ToDo.repo;

import com.Soumya.ToDo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,String> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(int id);
}
