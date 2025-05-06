package com.backend.Insurance.AiModel.DTOS;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ImageCheckerResponse {
    @JsonProperty("match text probability")
    private double matchTextProbability;

    @JsonProperty("false text probability")
    private double falseTextProbability;

    private String result;
}

