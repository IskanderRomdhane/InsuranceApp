package com.backend.Insurance.Sinistre.SinistreService;

import com.backend.Insurance.Document.Entity.Document;
import com.backend.Insurance.Document.Repository.DocumentRepository;
import com.backend.Insurance.Document.DocumentSerivce.DocumentService;
import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.Image.Entity.Image;
import com.backend.Insurance.Image.Repository.ImageRepository;
import com.backend.Insurance.Image.ImageService.ImageService;
import com.backend.Insurance.Sinistre.AutoMobile.AutoMobile;
import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.DTOS.SinistreMonthlyCountDTO;
import com.backend.Insurance.Sinistre.Enums.Etat;
import com.backend.Insurance.Sinistre.Habilitation.Habilitation;
import com.backend.Insurance.Sinistre.Mapper.SinistreMapper;
import com.backend.Insurance.Sinistre.Sante.Sante;
import com.backend.Insurance.Sinistre.Entity.Sinistre;
import com.backend.Insurance.Sinistre.Repositroy.SinistreRepository;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SinistreService {
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final SinistreRepository sinistreRepository;
    private final DocumentService documentService;
    private final DocumentRepository documentRepository;
    @Autowired
    private SinistreMapper sinistreMapper;

    public ResponseEntity<String> CreateSinistre(MultipartFile document,MultipartFile image, SinistreDTO sinistreDTO) {
        Optional<User> optionalUser = userRepository.findById(sinistreDTO.getUserId());
        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            List<Image> imageList = new ArrayList<>();
            List<Document> documentList = new ArrayList<>();
            Sinistre sinistre = Sinistre.builder()
                    .images(imageList)
                    .document(documentList)
                    .description(sinistreDTO.getDescriptionSinistre())
                    .object(sinistreDTO.getObjectSinistre())
                    .etat(Etat.SOUMIS)
                    .user(foundUser)
                    .date(LocalDateTime.now())
                    .amount(sinistreDTO.getAmount())
                    .build();
            sinistreRepository.save(sinistre);
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

            emailSenderService.sendEmail(foundUser.getEmail() , "Sinistre", "Sinistre with ID :"+ sinistre.getId() +
                    " created at the date :" + LocalDateTime.now() +
                    " with Sinistre status  :" + sinistre.getEtat());
            return ResponseEntity.ok("User Sinistre saved Successfully");
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("user not found");
        }
    }

    public ResponseEntity<String> ChangerEtat(Long sinistreId , SinistreDTO sinistreDTO) {
        Optional<Sinistre> sinistreOptional = sinistreRepository.findById(sinistreId);
        if(sinistreOptional.isPresent()){
            Sinistre sinistre = sinistreOptional.get();
            sinistre.setEtat(sinistreDTO.getEtat());
            sinistreRepository.save(sinistre);
            return ResponseEntity.ok("Etat changé avec succés");
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("sinistre not found");
        }
    }

    public ResponseEntity<List<SinistreDTO>> getSinistres() {
        List<Sinistre> sinistres = sinistreRepository.findAll();
        List<SinistreDTO> sinistreDTOS = sinistreMapper.toDtoList(sinistres);
        return ResponseEntity.ok(sinistreDTOS);
    }

    public ResponseEntity<List<Sinistre>> GetUserSinistres(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            List<Sinistre> sinistres = user.getSinistres();
            return ResponseEntity.ok(sinistres);
        }else {
            return ResponseEntity.status(HttpStatus.valueOf(404)).body(null);
        }
    }

    public ResponseEntity<Sinistre> GetSinistre(Long sinistreId) {
        Optional<Sinistre> sinistreOptional = sinistreRepository.findById(sinistreId);
        if(sinistreOptional.isPresent()){
            Sinistre sinistre = sinistreOptional.get();
            return ResponseEntity.ok(sinistre);
        }else {
            return ResponseEntity.status(HttpStatus.valueOf(404)).body(null);
        }
    }

    public ResponseEntity<List<?>> getAutoMobileSinistres(String sinistre_type) {
        switch (sinistre_type.toLowerCase()){
            case "automobile": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findBySubclass(AutoMobile.class)));
            case "habilitation": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findBySubclass(Habilitation.class)));
            case "sante": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findBySubclass(Sante.class)));
            default: return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<List<?>> getSinistresByStatus(String statut) {
        switch (statut.toUpperCase()){
            case "SOUMIS": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findByEtat(Etat.SOUMIS)));
            case "EN_EXAMEN": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findByEtat(Etat.EN_EXAMEN)));
            case "INFOS_COMPLEMENTAIRES_REQUISES": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findByEtat(Etat.INFOS_COMPLEMENTAIRES_REQUISES)));
            case "APPROUVE": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findByEtat(Etat.APPROUVE)));
            case "REJETE": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findByEtat(Etat.REJETE)));
            case "PAYE": return ResponseEntity.ok(sinistreMapper.toDtoList(sinistreRepository.findByEtat(Etat.PAYE)));

            default: return ResponseEntity.notFound().build();
        }
    }

    public List<SinistreMonthlyCountDTO> getSinistreCountPerMonth() {
        List<Object[]> results = sinistreRepository.countSinistresPerMonth();
        List<SinistreMonthlyCountDTO> response = new ArrayList<>();

        for (Object[] row : results) {
            Integer month = ((Number) row[0]).intValue();
            Integer year = ((Number) row[1]).intValue();
            Long count = ((Number) row[2]).longValue();

            response.add(new SinistreMonthlyCountDTO(month, year, count));
        }

        return response;
    }

    public Long countSinistresByEtat(Etat etat) {
        return sinistreRepository.countByEtat(etat);
    }

    public ResponseEntity<List<SinistreDTO>> getSinistresByEtat(Etat etat) {
        List<Sinistre> sinistres = sinistreRepository.findByEtat(etat);
        List<SinistreDTO> dtos = sinistreMapper.toDtoList(sinistres);
        return ResponseEntity.ok(dtos);
    }


    public ResponseEntity<List<SinistreDTO>> GetUserRejectedSinistre(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            List<Sinistre> sinistres = sinistreRepository.findByUserId(userId);
            List<Sinistre> rejectedSinistres = new ArrayList<>();
            for (Sinistre s : sinistres){
                if (s.getEtat().equals(Etat.REJETE)){
                    rejectedSinistres.add(s);
                }
            }
            List<SinistreDTO> dtos = sinistreMapper.toDtoList(rejectedSinistres);
            return ResponseEntity.ok(dtos);
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<List<SinistreDTO>> GetUserDocumentManquantsSinistre(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            List<Sinistre> sinistres = sinistreRepository.findByUserId(userId);
            List<Sinistre> rejectedSinistres = new ArrayList<>();
            for (Sinistre s : sinistres){
                if (s.getEtat().equals(Etat.INFOS_COMPLEMENTAIRES_REQUISES)){
                    rejectedSinistres.add(s);
                }
            }
            List<SinistreDTO> dtos = sinistreMapper.toDtoList(rejectedSinistres);
            return ResponseEntity.ok(dtos);
        }
        return ResponseEntity.notFound().build();
    }
}
