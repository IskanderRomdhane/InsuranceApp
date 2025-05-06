package com.backend.Insurance.AiModel.DTOS;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GeneratorRequest {
    private final String id;
    private final String client;
    private final String Vehicle;
    private final String Claim_Description;
    private final String Image_Analysis;
    private final String Flagged;
    private final String Estimated_Repair_Cost;
    private final String Date_of_Incident;
}
