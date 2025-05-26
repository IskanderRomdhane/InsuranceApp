package com.backend.Insurance.Sinistre.Sante.Service;

import com.backend.Insurance.Document.Entity.Document;
import com.backend.Insurance.Document.Repository.DocumentRepository;
import com.backend.Insurance.Document.DocumentSerivce.DocumentService;
import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.Image.Entity.Image;
import com.backend.Insurance.Image.Repository.ImageRepository;
import com.backend.Insurance.Image.ImageService.ImageService;
import com.backend.Insurance.Sinistre.Enums.Etat;
import com.backend.Insurance.Sinistre.Sante.DTOS.SanteDTO;
import com.backend.Insurance.Sinistre.Sante.Sante;
import com.backend.Insurance.Sinistre.Sante.SanteRepository;
import com.backend.Insurance.Sinistre.Entity.Sinistre;
import com.backend.Insurance.Sinistre.Repositroy.SinistreRepository;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.Repository.UserRepository;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class SanteService {
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final SinistreRepository sinistreRepository;
    private final DocumentService documentService;
    private final DocumentRepository documentRepository;
    private final SanteRepository santeRepository;
    public ResponseEntity<String> CreateSanteSinistre(MultipartFile document, MultipartFile image, SanteDTO santeDTO) {
        Optional<User> optionalUser = userRepository.findById(santeDTO.getUserId());
        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            List<Image> imageList = new ArrayList<>();
            List<Document> documentList = new ArrayList<>();
            Sante sinistre = Sante.builder()
                    .images(imageList)
                    .document(documentList)
                    .description(santeDTO.getDescriptionSinistre())
                    .object(santeDTO.getObjectSinistre())
                    .etat(Etat.SOUMIS)
                    .user(foundUser)
                    .date(LocalDateTime.now())
                    .amount(santeDTO.getAmount())
                    .diagnosis(santeDTO.getDiagnosis())
                    .hospitalName(santeDTO.getHospitalName())
                    .isCashless(santeDTO.getIsCashless())
                    .build();
            santeRepository.save(sinistre);
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

    public ResponseEntity<List<Sante>> getSanteSinistre() {
        List<Sante> sinistres = santeRepository.findAll();
        return ResponseEntity.ok(sinistres);
    }

    public ResponseEntity<?> GetSanteSinistres(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()){
            List<Sante> santeList = santeRepository.findByUserId(userId);
            return ResponseEntity.ok(santeList);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }
}
