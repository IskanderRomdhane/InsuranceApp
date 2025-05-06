package com.backend.Insurance.AiModel;


import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/model")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;
    @GetMapping("/generate-response/{id}")
    public ResponseEntity<String> GenerateResponse (@PathVariable Long id) {
        return modelService.GenerateResponse(id);
    }
}
