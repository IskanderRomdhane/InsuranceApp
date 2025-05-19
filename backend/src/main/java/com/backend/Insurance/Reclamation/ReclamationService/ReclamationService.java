package com.backend.Insurance.Reclamation.ReclamationService;

import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.Image.Entity.Image;
import com.backend.Insurance.Image.Repository.ImageRepository;
import com.backend.Insurance.Image.ImageService.ImageService;
import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationResponseDTO;
import com.backend.Insurance.Reclamation.ENUMS.Status;
import com.backend.Insurance.Reclamation.ENUMS.TypeReclamation;
import com.backend.Insurance.Reclamation.Mapper.ReclamationMapper;
import com.backend.Insurance.Reclamation.Entity.Reclamation;
import com.backend.Insurance.Reclamation.Repository.ReclamationRepository;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.Repository.UserRepository;
import com.backend.Insurance.notification.Entity.Notification;
import com.backend.Insurance.notification.Repository.NotificationRepository;
import com.backend.Insurance.notification.NotificationService.NotificationService;
import com.backend.Insurance.notification.Enums.NotificationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReclamationService {
    private final ReclamationRepository reclamationRepository;
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final ReclamationMapper reclamationMapper;
    public ResponseEntity<String> CreerReclamation(ReclamationDTO reclamationDTO , MultipartFile image) {
        Optional<User> userOptional = userRepository.findByEmail(reclamationDTO.getUserEmail());
        if (userOptional.isPresent()) {
            User foundUser = userOptional.get();

            Reclamation reclamation = Reclamation.builder()
                    .date(LocalDateTime.now())
                    .typeReclamation(TypeReclamation.valueOf(reclamationDTO.getTypeReclamation().toUpperCase()))
                    .status(Status.PENDING)
                    .description(reclamationDTO.getDescription())
                    .build();
            reclamation.setUser(foundUser);

            List<Reclamation> userReclamations = foundUser.getReclamation();
            if (userReclamations == null){
                userReclamations = new ArrayList<>();
            }
            userReclamations.add(reclamation);
            foundUser.setReclamation(userReclamations);


            reclamationRepository.save(reclamation);
            userRepository.save(foundUser);

            try {
                String imageUrl = imageService.uploadImage(image);
                Image imageSaved = Image.builder()
                        .imageUrl(imageUrl)
                        .name("user : "+foundUser.getId()+" Reclamation Image")
                        .reclamation(reclamation)
                        .build();
                imageRepository.save(imageSaved);
                List<Image> images = reclamation.getImages();
                if (images == null){
                    images = new ArrayList<>();
                }
                images.add(imageSaved);
                reclamation.setImages(images);
                reclamationRepository.save(reclamation);
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }


//            emailSenderService.sendEmail(foundUser.getEmail() , "Reclamation", "Reclamation with ID :"+ reclamation.getId() +
//                    " created at the date :" + LocalDateTime.now() +
//                    " with reclamation status  :" + reclamation.getStatus());
            return ResponseEntity.ok("User Reclamation saved Successfully");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
        }
    }

    public ResponseEntity<String> ChangerStatus(Long reclamationID, ReclamationDTO reclamationDTO) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(reclamationID);
        if(reclamationOptional.isPresent()){
            Reclamation reclamation = reclamationOptional.get();

            // Update the reclamation status
            reclamation.setStatus(Status.valueOf(reclamationDTO.getStatus().toUpperCase()));
            reclamationRepository.save(reclamation);

            // Create a notification
            Notification notification = Notification.builder()
                    .status(NotificationStatus.valueOf(reclamationDTO.getStatus().toUpperCase()))
                    .message("Your reclamation (ID: " + reclamation.getId() + ") status has been changed to " + reclamationDTO.getStatus())
                    .user(reclamation.getUser())
                    .build();

            // Save the notification to the database
            notificationRepository.save(notification);

            // Send the notification to the user
            notificationService.sendNotification(
                    String.valueOf(reclamation.getUser().getId()),
                    notification
            );

            return ResponseEntity.ok("Status changed and notification saved successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reclamation Not Found");
        }
    }


    public ResponseEntity<List<ReclamationResponseDTO>> RetrieveReclamations() {
        List<Reclamation> reclamations = reclamationRepository.findAll();
        List<ReclamationResponseDTO> response = new ArrayList<>();
        for (Reclamation reclamation:
                reclamations
        ) {
            List<String> imagesUrls = reclamation.getImages().stream()
                    .map(Image::getImageUrl)
                    .collect(Collectors.toList());
            ReclamationResponseDTO DTO = ReclamationResponseDTO.builder()
                    .id(reclamation.getId())
                    .Email(reclamation.getUser().getEmail())
                    .date(LocalDateTime.now())
                    .fullName(reclamation.getUser().getFullName())
                    .Description(reclamation.getDescription())
                    .status(reclamation.getStatus().toString())
                    .type(reclamation.getTypeReclamation().toString())
                    .imageUrl(imagesUrls)
                    .build();
            response.add(DTO);
        }
        return ResponseEntity.ok(response);
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

    public ResponseEntity<ReclamationResponseDTO> GetRelamation(Long reclamationId) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(reclamationId);
        if (reclamationOptional.isPresent()){
            Reclamation reclamation = reclamationOptional.get();
            List<String> imagesUrls = reclamation.getImages().stream()
                    .map(Image::getImageUrl)
                    .collect(Collectors.toList());
            ReclamationResponseDTO response = ReclamationResponseDTO.builder()
                    .id(reclamation.getId())
                    .Email(reclamation.getUser().getEmail())
                    .date(LocalDateTime.now())
                    .fullName(reclamation.getUser().getFullName())
                    .Description(reclamation.getDescription())
                    .status(reclamation.getStatus().toString())
                    .type(reclamation.getTypeReclamation().toString())
                    .imageUrl(imagesUrls)
                    .build();
            return ResponseEntity.ok(response);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<List<ReclamationResponseDTO>> GetRelamationByStatus(String status) {
        return ResponseEntity.ok(reclamationMapper.toDtoList(reclamationRepository.findByStatus(Status.valueOf(status.toUpperCase()))));
    }

    public ResponseEntity<List<ReclamationResponseDTO>> GetRelamationByType(String type) {
        return ResponseEntity.ok(reclamationMapper.toDtoList(reclamationRepository.findBytypeReclamation(TypeReclamation.valueOf(type.toUpperCase()))));
    }

    public ResponseEntity<List<Reclamation>> GetUserRelamationByType( String userEmail, String status) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if(optionalUser.isPresent()){
            User foundUser = optionalUser.get();
            List<Reclamation> reclamations = foundUser.getReclamation();
            List<Reclamation> response = new ArrayList<>();
            for (Reclamation claim: reclamations){
                if (claim.getStatus().toString().equals(status.toUpperCase())){
                    response.add(claim);
                }
            }
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}