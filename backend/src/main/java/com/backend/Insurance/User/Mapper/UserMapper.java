package com.backend.Insurance.User.Mapper;

import com.backend.Insurance.Image.Entity.Image;
import com.backend.Insurance.User.DTO.UserDTO;
import com.backend.Insurance.User.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "profilePictureUrl", source = "profilePicture.imageUrl")
    @Mapping(target = "active", source = "active")
    UserDTO toDto(User user);

    List<UserDTO> toDtoList(List<User> users);
    default String mapProfilePicture(Image image) {
        return image != null ? image.getImageUrl() : null;
    }
}
