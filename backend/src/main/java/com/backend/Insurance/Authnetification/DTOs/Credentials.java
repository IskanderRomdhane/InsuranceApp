package com.backend.Insurance.Authnetification.DTOs;

import org.keycloak.representations.idm.CredentialRepresentation;

import java.util.List;

public class Credentials {
    public static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(true);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }
}