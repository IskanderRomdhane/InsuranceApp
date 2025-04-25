package com.backend.Insurance.Sinistre.Mapper;

import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.Sinistre;
import org.mapstruct.Mapper;

import java.util.List;
import org.mapstruct.*;
@Mapper(componentModel = "spring")
public interface SinistreMapper {
    @Mapping(target = "id" , source = "id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "etat" , source = "etat")
    @Mapping(target = "objectSinistre", source = "object")
    @Mapping(target = "descriptionSinistre", source = "description")
    @Mapping(target = "categorie", expression = "java(sinistre.getClass().getSimpleName())")
    @Mapping(target = "date" , source = "date" )
    SinistreDTO toDto(Sinistre sinistre);

    List<SinistreDTO> toDtoList(List<Sinistre> sinistres);
}

