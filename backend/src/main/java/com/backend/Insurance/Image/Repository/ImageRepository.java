package com.backend.Insurance.Image.Repository;

import com.backend.Insurance.Image.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
