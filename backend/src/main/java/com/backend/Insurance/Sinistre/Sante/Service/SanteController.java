package com.backend.Insurance.Sinistre.Sante.Service;

import com.backend.Insurance.Sinistre.Sante.DTOS.SanteDTO;
import com.backend.Insurance.Sinistre.Sante.Sante;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/sinistre/sante")
@RequiredArgsConstructor
public class SanteController {
    private final ObjectMapper objectMapper;
    private final SanteService santeService;
    @PostMapping("/creersinistre")
    private ResponseEntity<String> CreateSinistre(
            @RequestParam("image") MultipartFile image,
            @RequestParam("sinistre") String sinistreJson,
            @RequestParam("document") MultipartFile document
    ){
        try {
            SanteDTO santeDTO = objectMapper.readValue(sinistreJson, SanteDTO.class);
            return santeService.CreateSanteSinistre(document ,image , santeDTO);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    @GetMapping()
    private ResponseEntity<List<Sante>> RetrieveSanteSinistres (){
        return santeService.getSanteSinistre();
    }
    @GetMapping("/getusersinistres/{userId}")
    private ResponseEntity<?> RetrieveSanteSinistres(
            @PathVariable Long userId){
        return santeService.GetSanteSinistres(userId);
    }
}
