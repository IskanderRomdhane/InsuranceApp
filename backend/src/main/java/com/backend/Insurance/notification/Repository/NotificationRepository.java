package com.backend.Insurance.notification.Repository;

import com.backend.Insurance.User.User;
import com.backend.Insurance.notification.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(User user);
    List<Notification> findByUserId(String userId);
}
