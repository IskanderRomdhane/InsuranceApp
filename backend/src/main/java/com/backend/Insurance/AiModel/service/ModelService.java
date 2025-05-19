package com.backend.Insurance.AiModel.service;

import com.backend.Insurance.AiModel.DTOS.GeneratorRequest;
import com.backend.Insurance.AiModel.DTOS.ImageCheckerResponse;
import com.backend.Insurance.Sinistre.Entity.Sinistre;
import com.backend.Insurance.Sinistre.Repositroy.SinistreRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final SinistreRepository sinistreRepository;
    public ResponseEntity<String> GenerateResponse(Long sinistreId) {
        Optional<Sinistre> sinistreOptional = sinistreRepository.findById(sinistreId);
        if(sinistreOptional.isPresent()) {
            Sinistre foundSinistre = sinistreOptional.get();
            ResponseEntity<String> check_image_response = check_image(foundSinistre.getImages().get(0).getImageUrl(), foundSinistre.getObject());
            if (check_image_response.getStatusCode().value() == 200){
                try {
                    ObjectMapper mapper = new ObjectMapper();
                    ImageCheckerResponse resultDto = mapper.readValue(check_image_response.getBody(), ImageCheckerResponse.class);
                    String imageAnalysis = "";
                    if (resultDto.getResult().equals("NO")){
                        imageAnalysis = "Image and claim description match";
                    } else {
                        imageAnalysis = "Image and claim description doesn't match";
                    }

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    String formattedDate = foundSinistre.getDate().format(formatter);

                    GeneratorRequest generatorRequest = GeneratorRequest.builder()
                            .id(String.valueOf(foundSinistre.getId()))
                            .client(foundSinistre.getUser().getFullName())
                            .Claim_Description(foundSinistre.getDescription())
                            .Flagged(resultDto.getResult())
                            .Estimated_Repair_Cost(String.valueOf(foundSinistre.getAmount()))
                            .Date_of_Incident(formattedDate)
                            .Image_Analysis(imageAnalysis)
                            .Vehicle("Kia Rio")
                            .build();

                    ResponseEntity<String> generated_report = generate_report(generatorRequest);
                    return ResponseEntity.ok(generated_report.getBody());
                } catch (JsonProcessingException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed parsing the response");
                }
            } else {
                return ResponseEntity.status(check_image_response.getStatusCode()).body("an error has occurred within the AI model");
            }
        }
        return ResponseEntity.ok("");
    }
    public ResponseEntity<String> check_image(String imagePath , String objetSinistre){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8086/check";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("path", imagePath);
        requestBody.put("objet", objetSinistre);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("an error has occured within the AI model");
        }
    }

    public ResponseEntity<String> generate_report(GeneratorRequest request){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8087/generate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("id", request.getId());
        requestBody.put("client", request.getClient());
        requestBody.put("Vehicle", request.getVehicle());
        requestBody.put("Claim_Description", request.getClaim_Description());
        requestBody.put("Image_Analysis", request.getImage_Analysis());
        requestBody.put("Flagged", request.getFlagged());
        requestBody.put("Estimated_Repair_Cost", request.getEstimated_Repair_Cost());
        requestBody.put("Date_of_Incident", request.getDate_of_Incident());

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("an error has occured within the AI model");
        }
    }
}
