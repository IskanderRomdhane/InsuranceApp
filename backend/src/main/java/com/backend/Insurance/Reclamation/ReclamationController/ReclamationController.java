package com.backend.Insurance.Reclamation.ReclamationController;

import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationResponseDTO;
import com.backend.Insurance.Reclamation.Entity.Reclamation;
import com.backend.Insurance.Reclamation.ReclamationService.ReclamationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/reclamation")
@RequiredArgsConstructor
public class ReclamationController {
    private final ReclamationService reclamationService;
    private final ObjectMapper objectMapper;


    @PostMapping("/CreerReclamation")
    public ResponseEntity<String> uploadReclamation(
            @RequestParam("file") MultipartFile file,
            @RequestParam("reclamation") String reclamationJson) {
        try {
            ReclamationDTO reclamationDTO = objectMapper.readValue(reclamationJson, ReclamationDTO.class);
            return reclamationService.CreerReclamation(reclamationDTO, file);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input: " + e.getMessage());
        }
    }


    @PutMapping("/changerstatus/{ReclamationID}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> ChangerStatus(
            @PathVariable Long ReclamationID,
            @RequestBody ReclamationDTO reclamationDTO
    ){
        return reclamationService.ChangerStatus(ReclamationID , reclamationDTO);
    }
    @GetMapping("/getusersrelamations")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReclamationResponseDTO>> RetrieveReclamations (){
        return reclamationService.RetrieveReclamations();
    }
    @GetMapping("/getrelamations/{userEmail}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reclamation>> GetUserRelamations (
            @PathVariable String userEmail
    ){
        return reclamationService.GetUserRelamations(userEmail);
    }
    @GetMapping("/getreclamation/{reclamationId}")
    public ResponseEntity<ReclamationResponseDTO> GetRelamation (
            @PathVariable Long reclamationId
    ){
        return reclamationService.GetRelamation(reclamationId);
    }
    @GetMapping("/getreclamation/status/{status}")
    public ResponseEntity<List<ReclamationResponseDTO>> GetRelamationByStatus (
            @PathVariable String status
    ){
        return reclamationService.GetRelamationByStatus(status);
    }
    @GetMapping("/getreclamation/type/{type}")
    public ResponseEntity<List<ReclamationResponseDTO>> GetRelamationByType (
            @PathVariable String type
    ){
        return reclamationService.GetRelamationByType(type);
    }
    @GetMapping("/getuserreclamation")
    public ResponseEntity<List<Reclamation>> GetUserRelamationByType (
            @RequestParam String userEmail,
            @RequestParam String status
    ){
        return reclamationService.GetUserRelamationByType(userEmail , status);
    }

}
