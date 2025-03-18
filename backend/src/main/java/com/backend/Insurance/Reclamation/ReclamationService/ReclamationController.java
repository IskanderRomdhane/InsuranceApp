package com.backend.Insurance.Reclamation.ReclamationService;

import com.backend.Insurance.Reclamation.DTOS.ReclamationMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reclamation")
@RequiredArgsConstructor
public class ReclamationController {
    private final ReclamationService reclamationService;

    @PostMapping("/CreerReclamation/{userId}")
    public ResponseEntity<String> CreerReclamation(
            @PathVariable Long userId ,
            @RequestBody ReclamationMessageDto ReclamationMessage
            ){
        return reclamationService.CreerReclamation(userId , ReclamationMessage);
    }

}
