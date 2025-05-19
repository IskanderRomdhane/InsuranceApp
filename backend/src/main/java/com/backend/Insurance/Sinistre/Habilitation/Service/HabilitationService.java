package com.backend.Insurance.Sinistre.Habilitation.Service;

import com.backend.Insurance.Document.Entity.Document;
import com.backend.Insurance.Document.Repository.DocumentRepository;
import com.backend.Insurance.Document.DocumentSerivce.DocumentService;
import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.Image.Entity.Image;
import com.backend.Insurance.Image.Repository.ImageRepository;
import com.backend.Insurance.Image.ImageService.ImageService;
import com.backend.Insurance.Sinistre.Enums.Etat;
import com.backend.Insurance.Sinistre.Habilitation.DTOS.HabilitationDTO;
import com.backend.Insurance.Sinistre.Habilitation.Habilitation;
import com.backend.Insurance.Sinistre.Habilitation.HabilitationRepository;
import com.backend.Insurance.Sinistre.Entity.Sinistre;
import com.backend.Insurance.Sinistre.Repositroy.SinistreRepository;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.Repository.UserRepository;
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
public class HabilitationService {
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final SinistreRepository sinistreRepository;
    private final DocumentService documentService;
    private final DocumentRepository documentRepository;
    private final HabilitationRepository habilitationRepository;
    public ResponseEntity<String> CreateAutoMobileSinistre(MultipartFile document, MultipartFile image, HabilitationDTO habilitationDTO) {
        Optional<User> optionalUser = userRepository.findById(habilitationDTO.getUserId());
        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            List<Image> imageList = new ArrayList<>();
            List<Document> documentList = new ArrayList<>();
            Habilitation sinistre = Habilitation.builder()
                    .images(imageList)
                    .document(documentList)
                    .description(habilitationDTO.getDescriptionSinistre())
                    .object(habilitationDTO.getObjectSinistre())
                    .etat(Etat.PENDING)
                    .user(foundUser)
                    .date(LocalDateTime.now())
                    .amount(habilitationDTO.getAmount())
                    .propertyAddress(habilitationDTO.getPropertyAddress())
                    .damageType(habilitationDTO.getDamageType())
                    .build();
            habilitationRepository.save(sinistre);
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
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
            sinistreRepository.save(sinistre);
            List<Sinistre> sinistres = foundUser.getSinistres();
            if (sinistres == null) {
                sinistres = new ArrayList<>();
            }
            sinistres.add(sinistre);
            foundUser.setSinistres(sinistres);
            userRepository.save(foundUser);

            /*emailSenderService.sendEmail(foundUser.getEmail(), "Sinistre", "Sinistre with ID :" + sinistre.getId() +
                    " created at the date :" + LocalDateTime.now() +
                    " with Sinistre status  :" + sinistre.getEtat());*/
            return ResponseEntity.ok("User Sinistre saved Successfully");
        } else {
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("user not found");
        }
    }

    public ResponseEntity<List<Habilitation>> getHabilitationSinistre() {
        List<Habilitation> sinistres = habilitationRepository.findAll();
        return ResponseEntity.ok(sinistres);
    }

    public ResponseEntity<?> GetHabilitationSinistres(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()){
            List<Habilitation> habilitationsList = habilitationRepository.findByUserId(userId);
            return ResponseEntity.ok(habilitationsList);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }
}
