package com.backend.Insurance.Sinistre.Habilitation.Service;

import com.backend.Insurance.Sinistre.Habilitation.DTOS.HabilitationDTO;
import com.backend.Insurance.Sinistre.Habilitation.Habilitation;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/sinistre/habilitation")
@RequiredArgsConstructor
public class HabilitationController {
    private final ObjectMapper objectMapper;
    private final HabilitationService habilitationService;
    @PostMapping("/creersinistre")
    private ResponseEntity<String> CreateSinistre(
            @RequestParam("image") MultipartFile image,
            @RequestParam("sinistre") String sinistreJson,
            @RequestParam("document") MultipartFile document
    ){
        try {
            HabilitationDTO habilitationDTO = objectMapper.readValue(sinistreJson, HabilitationDTO.class);
            return habilitationService.CreateAutoMobileSinistre(document ,image , habilitationDTO);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    @GetMapping()
    private ResponseEntity<List<Habilitation>> RetrieveHabilitationSinistres (){
        return habilitationService.getHabilitationSinistre();
    }
    @GetMapping("/getusersinistres/{userId}")
    private ResponseEntity<?> RetriveUserHabilitationSinistres(
            @PathVariable String userId){
        return habilitationService.GetHabilitationSinistres(userId);
    }
}
