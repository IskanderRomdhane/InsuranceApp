package com.backend.Insurance.Sinistre.AutoMobile.Service;

import com.backend.Insurance.Sinistre.AutoMobile.AutoMobile;
import com.backend.Insurance.Sinistre.AutoMobile.DTOS.AutoMobileDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/sinistre/automobile")
@RequiredArgsConstructor
public class AutoMobileController {
    private final ObjectMapper objectMapper;
    private final AutoMobileService autoMobileService;
    @PostMapping("/creersinistre")
    private ResponseEntity<String> CreateSinistre(
            @RequestParam("image") MultipartFile image,
            @RequestParam("sinistre") String sinistreJson,
            @RequestParam("document") MultipartFile document
    ){
        try {
            AutoMobileDTO autoMobileDTO = objectMapper.readValue(sinistreJson, AutoMobileDTO.class);
            return autoMobileService.CreateAutoMobileSinistre(document ,image , autoMobileDTO);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    @GetMapping()
    private ResponseEntity<List<AutoMobile>> RetriveAutoMobileSinistres (){
        return autoMobileService.getAutoSinistre();
    }
    @GetMapping("/getusersinistres/{userId}")
    private ResponseEntity<?> RetriveUserAutoMobileSinistres(
            @PathVariable Long userId){
        return autoMobileService.GetUserAutoMobileSinistres(userId);
    }
}
