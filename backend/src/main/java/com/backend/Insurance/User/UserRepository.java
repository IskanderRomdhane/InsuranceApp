package com.backend.Insurance.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , String> {
    Optional<User> findByCIN(String CIN);
    Optional<User> findByEmail(String Email);
}
