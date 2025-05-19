package com.backend.Insurance.Authnetification.Keycloak.Service;

import com.backend.Insurance.Authnetification.Config.KeycloakConfig;
import com.backend.Insurance.Authnetification.DTOs.LoginRequest;
import com.backend.Insurance.Authnetification.DTOs.PasswordUpdateRequest;
import com.backend.Insurance.Authnetification.Security.JwtParser;
import com.backend.Insurance.Emails.EmailSenderService;
import com.backend.Insurance.User.User;
import com.backend.Insurance.User.Repository.UserRepository;
import com.backend.Insurance.Authnetification.DTOs.Credentials;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.core.Response;
import java.security.SecureRandom;
import java.util.*;

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
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;

    public ResponseEntity<String> login(LoginRequest loginDto) {
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

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatusCode.valueOf(400)){
                return ResponseEntity.status(HttpStatus.valueOf(400)).body("Put your new password.");
            }
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
            } else if (e.getStatusCode() == HttpStatus.FORBIDDEN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to access this resource.");
            }
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            // Handle any other errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    public ResponseEntity<String> refresh(Map<String , String> refreshToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "http://localhost:8080/realms/InsuranceApp/protocol/openid-connect/token";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
            requestBody.add("grant_type", "refresh_token");
            requestBody.add("client_id", "Insurance");
            requestBody.add("refresh_token", refreshToken.get("refreshToken"));
            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }

    public String register(User userRep) {
        try {
            UserRepresentation user = new UserRepresentation();
            user.setUsername(userRep.getUsername());
            user.setFirstName(userRep.getFirstname());
            user.setLastName(userRep.getLastname());
            user.setEmail(userRep.getEmail());

            String password = generateRandomPassword(12);
            user.setCredentials(Collections.singletonList(Credentials.createPasswordCredentials(password)));
            user.setEnabled(true);
            user.setEmailVerified(true);

            Map<String, List<String>> clientRoles = new HashMap<>();
            clientRoles.put("Insurance", List.of("client_user"));
            user.setClientRoles(clientRoles);
            user.setRequiredActions(Collections.singletonList("UPDATE_PASSWORD"));

            UsersResource usersResource = KeycloakConfig.getInstance().realm(realm).users();
            Response response = usersResource.create(user);

            if (response.getStatus() == 201) {
                // Extract and print the user ID
                String locationHeader = response.getHeaderString("Location");
                String userId = locationHeader.substring(locationHeader.lastIndexOf('/') + 1);

                // Send email
                /*emailSenderService.sendEmail(userRep.getEmail(),
                        "Création de votre compte",
                        "Votre compte chez Wiqaya Insurance a été créé avec succès." +
                                "\n\nVoici vos informations de connexion :" +
                                "\nAdresse e-mail : " + userRep.getEmail() +
                                "\nNom d'utilisateur : " + userRep.getUsername() +
                                "\nMot de passe temporaire : " + password +
                                "\n\n⚠️ Ce mot de passe est à usage unique et temporaire." +
                                "\nVeuillez vous connecter dès que possible et le modifier pour sécuriser votre compte.");*/

                return userId;
            } else {
                throw new RuntimeException("Failed to create user: HTTP Status : " + response.getStatus());
            }
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error while registering user", e);
        }
    }


    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(chars.length());
            password.append(chars.charAt(randomIndex));
        }

        return password.toString();
    }

    public ResponseEntity<String> updatePassword(PasswordUpdateRequest request) {
        try {
            UsersResource usersResource = KeycloakConfig.getInstance().realm(realm).users();
            List<UserRepresentation> users = usersResource.search(request.getUsername());
            if (users.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
            UserResource userResource = usersResource.get(users.get(0).getId());

            CredentialRepresentation newCredential = new CredentialRepresentation();
            newCredential.setTemporary(false);
            newCredential.setType(CredentialRepresentation.PASSWORD);
            newCredential.setValue(request.getNewPassword());

            userResource.resetPassword(newCredential);
            
            return ResponseEntity.ok("Password updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password.");
        }
    }

    public void initiatePasswordReset(String email) {
        Keycloak keycloak = KeycloakConfig.getInstance();

        List<UserRepresentation> users = keycloak.realm(realm)
                .users()
                .search(email, true);

        if (users.isEmpty()) {
            return; //users list is empty
        }

        String userId = users.get(0).getId();

        UsersResource usersResource = keycloak.realm(realm).users();
        usersResource.get(userId).executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));
    }

    public ResponseEntity<String> toggleUserStatus(String username, boolean enable) {
        try {
            Keycloak keycloak = KeycloakConfig.getInstance();
            UsersResource usersResource = keycloak.realm(realm).users();
            List<UserRepresentation> users = usersResource.search(username);

            if (users.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            UserRepresentation user = users.get(0);
            user.setEnabled(enable);

            UserResource userResource = usersResource.get(user.getId());
            userResource.update(user);

            return ResponseEntity.ok("User " + (enable ? "enabled" : "disabled") + " successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error toggling user status: " + e.getMessage());
        }
    }

}