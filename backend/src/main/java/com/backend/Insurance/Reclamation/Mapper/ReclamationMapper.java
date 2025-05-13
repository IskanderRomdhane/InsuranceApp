package com.backend.Insurance.Reclamation.Mapper;

import com.backend.Insurance.Reclamation.DTOS.ReclamationDTO;
import com.backend.Insurance.Reclamation.DTOS.ReclamationResponseDTO;
import com.backend.Insurance.Reclamation.Reclamation;
import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.Sinistre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReclamationMapper {
    @Mapping(target = "type", expression = "java(reclamation.getTypeReclamation().name())")
    @Mapping(target = "userId", source = "user.id")  // Add this line to map userId
    ReclamationResponseDTO toDto(Reclamation reclamation);

    List<ReclamationResponseDTO> toDtoList(List<Reclamation> reclamation);
}
