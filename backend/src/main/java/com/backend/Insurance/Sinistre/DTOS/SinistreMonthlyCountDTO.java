package com.backend.Insurance.Sinistre.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SinistreMonthlyCountDTO {
    private int year;
    private int month;
    private long count;
}
