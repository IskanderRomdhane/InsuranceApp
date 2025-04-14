package com.backend.Insurance.Sinistre.SinistreService;

import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.Image.Image;
import com.backend.Insurance.Image.ImageRepository;
import com.backend.Insurance.Image.ImageService;
import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.Enums.Categorie;
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
public class SinistreService {
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final SinistreRepository sinistreRepository;


    public ResponseEntity<String> CreateSinistre(MultipartFile image, SinistreDTO sinistreDTO) {
        Optional<User> optionalUser = userRepository.findById(sinistreDTO.getUserId());
        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            List<Image> imageList = new ArrayList<>();
            try {
                String imageUrl = imageService.uploadImage(image);
                Image imageSaved = Image.builder()
                        .imageUrl(imageUrl)
                        .name("user : " + foundUser.getId() + " Reclamation Image")
                        .sinistre(null)
                        .build();
                imageList.add(imageSaved);
                imageRepository.save(imageSaved);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
            Sinistre sinistre = Sinistre.builder()
                    .images(imageList)
                    .description(sinistreDTO.getDescriptionSinistre())
                    .object(sinistreDTO.getObjectSinistre())
                    .etat(Etat.PENDING)
                    .categorie(Categorie.valueOf(sinistreDTO.getCategorie().toUpperCase()))
                    .user(foundUser)
                    .date(LocalDateTime.now())
                    .build();
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

    public ResponseEntity<String> ChangerEtat(Long sinistreId , String etat) {
        Optional<Sinistre> sinistreOptional = sinistreRepository.findById(sinistreId);
        if(sinistreOptional.isPresent()){
            Sinistre sinistre = sinistreOptional.get();
            sinistre.setEtat(Etat.valueOf(etat.toUpperCase()));
            sinistreRepository.save(sinistre);
            return ResponseEntity.ok("Etat changé avec succés");
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("sinistre not found");
        }
    }

    public ResponseEntity<List<Sinistre>> getSinistres() {
        List<Sinistre> sinistres = sinistreRepository.findAll();
        return ResponseEntity.ok(sinistres);
    }

    public ResponseEntity<List<Sinistre>> GetUserSinistres(Long userId) {
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
}
