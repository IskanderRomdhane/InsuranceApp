package com.backend.Insurance.Reclamation.ReclamationService;

import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.Message.DTOS.MessageDTO;
import com.backend.Insurance.Message.Message;
import com.backend.Insurance.Message.MessageRepository;
import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.ENUMS.Status;
import com.backend.Insurance.Reclamation.ENUMS.TypeReclamation;
import com.backend.Insurance.Reclamation.Reclamation;
import com.backend.Insurance.Reclamation.ReclamationRepository;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.UserRepository;
import lombok.Data;
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
    private final EmailSenderService emailSenderService;
    public ResponseEntity<String> CreerReclamation(ReclamationDTO reclamationDTO) {
        Optional<User> userOptional = userRepository.findByEmail(reclamationDTO.getUserEmail());
        if (userOptional.isPresent()) {
            User foundUser = userOptional.get();

            Reclamation reclamation = Reclamation.builder()
                    .date(LocalDateTime.now())
                    .typeReclamation(TypeReclamation.valueOf(reclamationDTO.getTypeReclamation().toUpperCase()))
                    .status(Status.PENDING)
                    .description(reclamationDTO.getDescription())
                    .build();

            List<Message> reclamationMessages = reclamation.getMessage();
            if (reclamationMessages == null){
                reclamationMessages = new ArrayList<>();
            }
            reclamation.setMessage(reclamationMessages);
            reclamation.setUser(foundUser);

            List<Reclamation> userReclamations = foundUser.getReclamation();
            if (userReclamations == null){
                userReclamations = new ArrayList<>();
            }
            userReclamations.add(reclamation);
            foundUser.setReclamation(userReclamations);

            reclamationRepository.save(reclamation);
            userRepository.save(foundUser);
            emailSenderService.sendEmail(foundUser.getEmail() , "Reclamation", "Reclamation with ID :"+ reclamation.getId() +
                    " created at the date :" + LocalDateTime.now() +
                    " with reclamation status  :" + reclamation.getStatus());
            return ResponseEntity.ok("User Reclamation saved Successfully");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
        }
    }

    public ResponseEntity<String> RepondreReclamation(Long reclamationID , MessageDTO messageDTO) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(reclamationID);
        if(reclamationOptional.isPresent()){
            Reclamation reclamation = reclamationOptional.get();

            List<Message> reclamationMessages = reclamation.getMessage();
            Message message = Message.builder()
                    .content(messageDTO.getContent())
                    .expediteurEmail(reclamation.getUser().getEmail())
                    .dateDenvoi(LocalDateTime.now())
                    .expediteur(reclamation.getUser().getFullName())
                    .associatedReclamation(reclamation)
                    .build();
            message = messageRepository.save(message);

            if (reclamationMessages == null){
                reclamationMessages = new ArrayList<>();
            }
            reclamationMessages.add(message);
            reclamation.setMessage(reclamationMessages);

            reclamationRepository.save(reclamation);
            return ResponseEntity.ok("Message Sent Successfully");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reclamation Not Found");
        }
    }

    public ResponseEntity<String> ChangerStatus(Long reclamationID, String status) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(reclamationID);
        if(reclamationOptional.isPresent()){
            Reclamation reclamation = reclamationOptional.get();
            reclamation.setStatus(Status.valueOf(status.toUpperCase()));
            reclamationRepository.save(reclamation);
            emailSenderService.sendEmail(reclamation.getUser().getEmail() , "Reclamation", "Reclamation with ID :"+ reclamation.getId() +
                    " Status has been update to "+ status + "please check your inbox for more details");
            return ResponseEntity.ok("Status changed Successfully");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reclamation Not Found");
        }
    }

    public ResponseEntity<List<Reclamation>> RetrieveReclamations() {
        return ResponseEntity.ok(reclamationRepository.findAll());
    }

    public ResponseEntity<List<Reclamation>> GetUserRelamations(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if(userOptional.isPresent()){
            User foundUser = userOptional.get();
            return ResponseEntity.ok(reclamationRepository.findByUserId(foundUser.getId()));
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    public ResponseEntity<Reclamation> GetRelamation(Long reclamationId) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(reclamationId);
        if (reclamationOptional.isPresent()){
            return ResponseEntity.ok(reclamationOptional.get());
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}