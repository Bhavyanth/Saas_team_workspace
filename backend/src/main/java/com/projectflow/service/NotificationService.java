package com.projectflow.service;

import com.projectflow.entity.Notification;
import com.projectflow.entity.User;
import com.projectflow.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Transactional
    public Notification createAndSendNotification(User recipient, String content, String type) {
        Notification notification = Notification.builder()
                .recipient(recipient)
                .content(content)
                .type(type)
                .read(false)
                .build();

        Notification saved = notificationRepository.save(notification);

        try {
            messagingTemplate.convertAndSendToUser(
                    recipient.getEmail(),
                    "/queue/notifications",
                    saved
            );
        } catch (Exception e) {
            // Fail silently if WebSocket is not active
        }

        return saved;
    }

    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findAllByRecipientIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnreadNotificationsForUser(Long userId) {
        return notificationRepository.findAllByRecipientIdAndReadOrderByCreatedAtDesc(userId, false);
    }

    @Transactional
    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead(Long userId) {
        List<Notification> unread = notificationRepository.findAllByRecipientIdAndReadOrderByCreatedAtDesc(userId, false);
        for (Notification n : unread) {
            n.setRead(true);
        }
        notificationRepository.saveAll(unread);
    }
}
