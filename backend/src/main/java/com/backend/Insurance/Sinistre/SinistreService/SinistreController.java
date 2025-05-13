package com.backend.Insurance.Sinistre.SinistreService;

import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationResponseDTO;
import com.backend.Insurance.Reclamation.Reclamation;
import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.DTOS.SinistreMonthlyCountDTO;
import com.backend.Insurance.Sinistre.Enums.Etat;
import com.backend.Insurance.Sinistre.Sinistre;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.Path;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sinistre")
public class SinistreController {
    private final ObjectMapper objectMapper;
    private final SinistreService sinistreService;
    @PostMapping("/creersinistre")
    private ResponseEntity<String> CreateSinistre(
            @RequestParam("image") MultipartFile image,
            @RequestParam("sinistre") String sinistreJson,
            @RequestParam("document") MultipartFile document
    ){
        try {
            SinistreDTO sinistreDTO = objectMapper.readValue(sinistreJson, SinistreDTO.class);
            return sinistreService.CreateSinistre(document ,image , sinistreDTO);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/changeretat/{sinistreId}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> ChangerStatus(
            @PathVariable Long sinistreId,
            @RequestBody SinistreDTO sinistreDTO
    ){
        return sinistreService.ChangerEtat(sinistreId, sinistreDTO);
    }
    @GetMapping("/sinistres")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SinistreDTO>> getSinistres(){
        return  sinistreService.getSinistres();
    }


    @GetMapping("/getusersinistres/{userId}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Sinistre>> GetUserSinistre (
            @PathVariable Long userId
    ){
        return sinistreService.GetUserSinistres(userId);
    }
    @GetMapping("/getsinistre/id/{sinistreId}")
    public ResponseEntity<Sinistre> GetSinistre (
            @PathVariable Long sinistreId
    ){
        return sinistreService.GetSinistre(sinistreId);
    }
    @GetMapping("/getsinistre/type/{sinistre_type}")
    public ResponseEntity<List<?>> GetAutoMobileSinistres(
            @PathVariable String sinistre_type
    ){
        return sinistreService.getAutoMobileSinistres(sinistre_type);
    }
    @GetMapping("/getsinistre/statut/{sinistre_statut}")
    public ResponseEntity<List<?>> GetSinistresByStatus(
            @PathVariable String sinistre_statut
    ){
        return sinistreService.getSinistresByStatus(sinistre_statut);
    }

    @GetMapping("/sinistres/per-month")
    public ResponseEntity<List<SinistreMonthlyCountDTO>> getSinistresPerMonth() {
        return ResponseEntity.ok(sinistreService.getSinistreCountPerMonth());
    }

    @GetMapping("/count/accepted")
    public ResponseEntity<Long> getAcceptedSinistreCount() {
        return ResponseEntity.ok(sinistreService.countSinistresByEtat(Etat.ACCEPTED));
    }

    @GetMapping("/count/pending")
    public ResponseEntity<Long> getPendingSinistreCount() {
        return ResponseEntity.ok(sinistreService.countSinistresByEtat(Etat.PENDING));
    }

    @GetMapping("/sinistres/accepted")
    public ResponseEntity<List<SinistreDTO>> getAcceptedSinistres() {
        return sinistreService.getSinistresByEtat(Etat.ACCEPTED);
    }
}
