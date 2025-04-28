package com.backend.Insurance.Reclamation.Mapper;

import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationResponseDTO;
import com.backend.Insurance.Reclamation.Reclamation;
import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.Sinistre;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReclamationMapper {
    ReclamationResponseDTO toDto(Reclamation reclamation);
    List<ReclamationResponseDTO> toDtoList(List<Reclamation> reclamation);
}
