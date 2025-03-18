package com.backend.Insurance.Reclamation.ReclamationService;

import com.backend.Insurance.Message.DTOS.MessageDTO;
import com.backend.Insurance.Message.Message;
import com.backend.Insurance.Message.MessageRepository;
import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationMessageDto;
import com.backend.Insurance.Reclamation.ENUMS.Status;
import com.backend.Insurance.Reclamation.ENUMS.TypeReclamation;
import com.backend.Insurance.Reclamation.Reclamation;
import com.backend.Insurance.Reclamation.ReclamationRepository;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReclamationService {
    private final ReclamationRepository reclamationRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    public ResponseEntity<String> CreerReclamation(Long userId, ReclamationMessageDto ReclamationMessage) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User foundUser = userOptional.get();
            ReclamationDTO reclamationREQUEST = ReclamationMessage.getReclamation();
            MessageDTO messageREQUEST = ReclamationMessage.getMessage();

            Message message = Message.builder()
                    .object(messageREQUEST.getObject())
                    .description(messageREQUEST.getDescription())
                    .expediteurEmail(foundUser.getEmail())
                    .dateDenvoi(LocalDateTime.now())
                    .expediteur(foundUser.getFullName())
                    .build();
            message = messageRepository.save(message);
            Reclamation reclamation = Reclamation.builder()
                    .date(LocalDateTime.now())
                    .typeReclamation(TypeReclamation.valueOf(reclamationREQUEST.getTypeReclamation().toUpperCase()))
                    .status(Status.PENDING)
                    .build();

            List<Message> reclamationMessages = reclamation.getMessage();
            if (reclamationMessages == null){
                reclamationMessages = new ArrayList<>();
            }
            reclamationMessages.add(message);
            reclamation.setMessage(reclamationMessages);
            reclamation.setUser(foundUser);

            List<Reclamation> userReclamations = foundUser.getReclamation();
            userReclamations.add(reclamation);
            foundUser.setReclamation(userReclamations);

            reclamationRepository.save(reclamation);
            userRepository.save(foundUser);
            return ResponseEntity.ok("User Reclamation saved Successfully");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
        }
    }
}