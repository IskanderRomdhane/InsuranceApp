package com.backend.Insurance.Authnetification.Keycloak;

import com.backend.Insurance.Authnetification.Config.KeycloakConfig;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

@Service
@RequiredArgsConstructor
public class KeycloakService {

    private final Keycloak keycloak = KeycloakConfig.getInstance();
    private final String realm = "InsuranceApp";

    public void updateUserEnabledStatus(String username, boolean enabled) {
        // Search user by username
        List<org.keycloak.representations.idm.UserRepresentation> users = keycloak.realm(realm)
                .users()
                .search(username, true);

        if (users.isEmpty()) {
            throw new RuntimeException("User not found in Keycloak with username: " + username);
        }

        // There may be multiple users with similar usernames; get the exact match
        UserRepresentation user = users.stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Exact username match not found"));

        // Update enabled status
        user.setEnabled(enabled);

        // Push update to Keycloak
        keycloak.realm(realm)
                .users()
                .get(user.getId())
                .update(user);
    }
}
