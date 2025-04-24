package com.backend.Insurance.Sinistre.AutoMobile.Service;

import com.backend.Insurance.Document.Document;
import com.backend.Insurance.Document.DocumentRepository;
import com.backend.Insurance.Document.DocumentService;
import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.Image.Image;
import com.backend.Insurance.Image.ImageRepository;
import com.backend.Insurance.Image.ImageService;
import com.backend.Insurance.Sinistre.AutoMobile.AutoMobile;
import com.backend.Insurance.Sinistre.AutoMobile.AutoMobileRepository;
import com.backend.Insurance.Sinistre.AutoMobile.DTOS.AutoMobileDTO;
import com.backend.Insurance.Sinistre.Enums.Etat;
import com.backend.Insurance.Sinistre.Sinistre;
import com.backend.Insurance.Sinistre.SinistreRepository;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class AutoMobileService {
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final SinistreRepository sinistreRepository;
    private final DocumentService documentService;
    private final DocumentRepository documentRepository;
    private final AutoMobileRepository autoMobileRepository;
    public ResponseEntity<String> CreateAutoMobileSinistre(MultipartFile document, MultipartFile image, AutoMobileDTO autoMobileDTO) {
        Optional<User> optionalUser = userRepository.findById(autoMobileDTO.getUserId());
        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            List<Image> imageList = new ArrayList<>();
            List<Document> documentList = new ArrayList<>();
            AutoMobile sinistre = AutoMobile.builder()
                    .images(imageList)
                    .document(documentList)
                    .description(autoMobileDTO.getDescriptionSinistre())
                    .object(autoMobileDTO.getObjectSinistre())
                    .etat(Etat.PENDING)
                    .user(foundUser)
                    .date(LocalDateTime.now())
                    .amount(autoMobileDTO.getAmount())
                    .Matricule(autoMobileDTO.getMatricule())
                    .Location(autoMobileDTO.getLocation())
                    .build();
            autoMobileRepository.save(sinistre);
            try {
                String imageUrl = imageService.uploadImage(image);
                Image imageSaved = Image.builder()
                        .imageUrl(imageUrl)
                        .name("user : " + foundUser.getId() + " Reclamation Image")
                        .sinistre(sinistre)
                        .build();
                imageList.add(imageSaved);
                imageRepository.save(imageSaved);
                sinistre.setImages(imageList);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
            try {
                String documentUrl = documentService.uploadDocument(document);
                Document documentSaved = Document.builder()
                        .documentUrl(documentUrl)
                        .documentName("user : " + foundUser.getId() + " Reclamation Image")
                        .sinistre(sinistre)
                        .build();
                documentList.add(documentSaved);
                documentRepository.save(documentSaved);
                sinistre.setDocument(documentList);
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
            sinistreRepository.save(sinistre);
            List<Sinistre> sinistres =foundUser.getSinistres();
            if(sinistres == null){
                sinistres = new ArrayList<>();
            }
            sinistres.add(sinistre);
            foundUser.setSinistres(sinistres);
            userRepository.save(foundUser);

            /*emailSenderService.sendEmail(foundUser.getEmail() , "Sinistre", "Sinistre with ID :"+ sinistre.getId() +
                    " created at the date :" + LocalDateTime.now() +
                    " with Sinistre status  :" + sinistre.getEtat());*/
            return ResponseEntity.ok("User Sinistre saved Successfully");
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("user not found");
        }
    }
    public ResponseEntity<List<AutoMobile>> getAutoSinistre() {
        List<AutoMobile> sinistres = autoMobileRepository.findAll();
        return ResponseEntity.ok(sinistres);
    }

    public ResponseEntity<?> GetUserAutoMobileSinistres(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()){
            List<AutoMobile> autoMobileList = autoMobileRepository.findByUserId(userId);
            return ResponseEntity.ok(autoMobileList);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }
}
