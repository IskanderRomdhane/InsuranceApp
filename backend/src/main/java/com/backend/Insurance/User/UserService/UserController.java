package com.backend.Insurance.User.UserService;

import com.backend.Insurance.User.DTO.UserDTO;
import com.backend.Insurance.User.User;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return userservice.getAllUsers();
    }

    @GetMapping("/userid/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        return userservice.getUserById(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable String id,
            @RequestParam boolean active) {
        return userservice.updateUserStatus(id, active);
    }
    @PutMapping("/uploadImage/{id}")
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable String id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return userservice.uploadProfilePicture(file , id);
    }
    @GetMapping("/getprofilpictureurl/{id}")
    public ResponseEntity<String> getProfilePictureUrl(
            @PathVariable String id
    ) throws IOException {
        return userservice.getProfilePictureUrl(id);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userservice.getUserCount());
    }
}
