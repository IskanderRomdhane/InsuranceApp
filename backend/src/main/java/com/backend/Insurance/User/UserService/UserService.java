package com.backend.Insurance.User.UserService;

import com.backend.Insurance.Authnetification.Keycloak.AuthService;
import com.backend.Insurance.Authnetification.Keycloak.KeycloakService;
import com.backend.Insurance.Image.Image;
import com.backend.Insurance.Image.ImageRepository;
import com.backend.Insurance.Image.ImageService;
import com.backend.Insurance.User.DTO.UserDTO;
import com.backend.Insurance.User.Mapper.UserMapper;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AuthService authService;
    private final KeycloakService keycloakService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final UserMapper userMapper;
    public ResponseEntity<String> syncUsers(List<User> userList) {
        if (userList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User list is empty");
        }
        for (User user : userList) {
            Optional<User> optUser = userRepository.findByCIN(user.getCIN());
            if (optUser.isPresent()) {
                System.out.println(optUser.get());
                continue;
            }
            User foundUser = User.builder()
                    .CIN(user.getCIN())
                    .email(user.getEmail())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .username(user.getUsername())
                    .role("client_user") //Users will have by default client_user Role
                    .build();

            try {
                Integer statusCode = authService.register(user);
                if (statusCode == 201) {
                    // if user is added to keycloak then added to DB
                    userRepository.save(foundUser);
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Failed to register user in Keycloak");
                }
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error syncing users: " + e.getMessage());
            }
        }
        return ResponseEntity.ok("Users synchronized successfully");
    }

    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOS = userMapper.toDtoList(userList);
        return ResponseEntity.ok(userDTOS);
    }

    public ResponseEntity<UserDTO> getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            return ResponseEntity.ok(userMapper.toDto(user));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<String> deleteUser(Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok("User deleted successfully");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    public ResponseEntity<User> updateUserStatus(Long id, boolean active) {
        return (ResponseEntity<User>) userRepository.findById(id).map(user -> {
            try {
                // First update Keycloak
                keycloakService.updateUserEnabledStatus(user.getUsername(), active);

                // Then update local DB
                user.setActive(active);
                return ResponseEntity.ok(userRepository.save(user));
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }).orElse(ResponseEntity.notFound().build());
    }


    public ResponseEntity<String> uploadProfilePicture(MultipartFile file, Long id) throws IOException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String imageUrl = imageService.uploadImage(file);
            Image image = user.getProfilePicture();
            if (image == null) {
                image = Image.builder()
                        .name("user : " + id + " profile picture")
                        .imageUrl(imageUrl)
                        .user(user)
                        .build();
            } else {
                image.setImageUrl(imageUrl);
                image.setName("user : " + id + " profile picture");
            }
            imageRepository.save(image);
            user.setProfilePicture(image);
            userRepository.save(user);
            return ResponseEntity.ok("Image changed successfully");
        }
        return ResponseEntity.notFound().build();
    }

}
