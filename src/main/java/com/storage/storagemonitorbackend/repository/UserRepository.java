package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String email);
}
