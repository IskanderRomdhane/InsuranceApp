package com.backend.Insurance.User.UserService;

import com.backend.Insurance.User.User;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userservice;
    @PutMapping("/synchronize")
    public ResponseEntity<String> SyncUsers (@RequestBody List<User> userList){
        return userservice.syncUsers(userList);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return userservice.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userservice.getUserById(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {
        return userservice.updateUserStatus(id, active);
    }
}
