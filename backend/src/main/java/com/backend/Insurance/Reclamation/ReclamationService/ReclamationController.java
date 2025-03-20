package com.backend.Insurance.Reclamation.ReclamationService;

import com.backend.Insurance.Message.DTOS.MessageDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.Reclamation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reclamation")
@RequiredArgsConstructor
public class ReclamationController {
    private final ReclamationService reclamationService;

    @PostMapping("/CreerReclamation")
    public ResponseEntity<String> CreerReclamation(
            @RequestBody ReclamationDTO reclamationDTO
            ){
        return reclamationService.CreerReclamation(reclamationDTO);
    }
    @PostMapping("/repondreReclamation/{ReclamationID}")
    public ResponseEntity<String> RepondreReclamation(
            @PathVariable Long ReclamationID ,
            @RequestBody MessageDTO messageDTO
    ){
        return reclamationService.RepondreReclamation(ReclamationID , messageDTO);
    }
    @PutMapping("/changerstatus/{ReclamationID}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> ChangerStatus(
            @PathVariable Long ReclamationID,
            @RequestBody String status
    ){
        return reclamationService.ChangerStatus(ReclamationID , status);
    }
    @GetMapping("/getusersrelamations")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reclamation>> RetrieveReclamations (){
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
    public ResponseEntity<Reclamation> GetRelamation (
            @PathVariable Long reclamationId
    ){
        return reclamationService.GetRelamation(reclamationId);
    }

}
