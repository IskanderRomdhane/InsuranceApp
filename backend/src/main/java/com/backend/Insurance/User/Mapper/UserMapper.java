package com.backend.Insurance.User.Mapper;

import com.backend.Insurance.Sinistre.DTOS.SinistreDTO;
import com.backend.Insurance.Sinistre.Sinistre;
import com.backend.Insurance.User.DTO.UserDTO;
import com.backend.Insurance.User.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "profilePictureUrl" , source = "profilePicture.imageUrl" )
    UserDTO toDto(User user);

    List<UserDTO> toDtoList(List<User> user);
}
