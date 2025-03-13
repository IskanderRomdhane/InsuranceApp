package com.backend.Insurance.Authnetification.Keycloak;

import com.backend.Insurance.Authnetification.DTOs.Credentials;
import com.backend.Insurance.Authnetification.DTOs.LoginRequest;
import com.backend.Insurance.Authnetification.DTOs.RegisterRequest;
import com.backend.Insurance.Authnetification.Security.JwtParser;
import com.backend.Insurance.Authnetification.Config.KeycloakConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;



@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${keycloak.server.url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.resource}")
    private String clientId;

    private final JwtParser jwtParser;

    public ResponseEntity<Map<String, String>> login(LoginRequest loginDto) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/realms/InsuranceApp/protocol/openid-connect/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "password");
        requestBody.add("client_id", clientId);
        requestBody.add("username", loginDto.getUsername());
        requestBody.add("password", loginDto.getPassword());
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            String accessToken = jsonNode.get("access_token").asText();
            Map<String, String> result = new HashMap<>();
            result.put("access_token", accessToken);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse access token", e);
        }
    }
    public ResponseEntity<String> register(RegisterRequest userDTO){
        CredentialRepresentation credential = Credentials
                .createPasswordCredentials(userDTO.getPassword());
        UserRepresentation user = new UserRepresentation();
        user.setUsername(userDTO.getUsername());
        user.setFirstName(userDTO.getName());
        user.setLastName(userDTO.getLastname());
        user.setEmail(userDTO.getEmail());
        user.setCredentials(Collections.singletonList(credential));
        user.setEnabled(true);
        user.setEmailVerified(true);
        try {
            UsersResource instance = KeycloakConfig.getInstance().realm(realm).users();
            Response response = instance.create(user);
            return ResponseEntity.ok("User Created Successfully with response : " + response.getStatus());
        }catch (Exception e){
            throw new RuntimeException("Failed to create user");
        }
    }


}