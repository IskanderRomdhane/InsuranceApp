package com.backend.Insurance.Sinistre.SinistreService;

import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationResponseDTO;
import com.backend.Insurance.Reclamation.Reclamation;
import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.Sinistre;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sinistre")
public class SinistreController {
    private final ObjectMapper objectMapper;
    private final SinistreService sinistreService;
    @PostMapping("/creersinistre")
    private ResponseEntity<String> CreateSinistre(
            @RequestParam("file") MultipartFile file,
            @RequestParam("sinistre") String sinistreJson
    ){
        try {
            SinistreDTO sinistreDTO = objectMapper.readValue(sinistreJson, SinistreDTO.class);
            return sinistreService.CreateSinistre(file , sinistreDTO);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/changeretat/{ReclamationID}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> ChangerStatus(
            @PathVariable Long sinistreId,
            @RequestBody String etat
    ){
        return sinistreService.ChangerEtat(sinistreId, etat);
    }
    @GetMapping("/sinistres")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Sinistre>> getSinistres(){
        return  sinistreService.getSinistres();
    }


    @GetMapping("/getusersinistres/{userId}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Sinistre>> GetUserRelamations (
            @PathVariable Long userId
    ){
        return sinistreService.GetUserSinistres(userId);
    }
    @GetMapping("/getsinistre/{sinistreId}")
    public ResponseEntity<Sinistre> GetRelamation (
            @PathVariable Long sinistreId
    ){
        return sinistreService.GetSinistre(sinistreId);
    }
}
