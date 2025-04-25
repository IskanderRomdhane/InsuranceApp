package com.backend.Insurance.Sinistre.AutoMobile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AutoMobileRepository extends JpaRepository<AutoMobile , Long> {
    List<AutoMobile> findByUserId(Long id);
}
