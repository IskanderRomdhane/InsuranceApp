package com.backend.Insurance.AiModel.controller;


import com.backend.Insurance.AiModel.service.ModelService;
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
