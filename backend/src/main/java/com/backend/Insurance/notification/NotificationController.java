package com.backend.Insurance.notification;

import com.backend.Insurance.User.User;
import com.backend.Insurance.User.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationController(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getUserNotifications(Authentication authentication) {
        String email = authentication.getName(); // Get logged-in user email (assuming authentication is based on email)
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Notification> notifications = notificationRepository.findByUser(user);  // Assuming you have this method in your repo
            return ResponseEntity.ok(notifications);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable String userEmail) {
        // Find the user by email
        User user = userRepository.findByEmail(userEmail).orElse(null);

        // Check if the user exists
        if (user == null) {
            return ResponseEntity.status(404).body(null); // User not found
        }

        // Fetch the notifications associated with this user
        List<Notification> notifications = notificationRepository.findByUserId(user.getId());

        if (notifications.isEmpty()) {
            return ResponseEntity.status(404).body(null); // No notifications found
        }

        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);

        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setRead(true);
            notificationRepository.save(notification);
            return ResponseEntity.ok("Notification marked as read");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }
    }

}
