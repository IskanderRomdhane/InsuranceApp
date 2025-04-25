package com.backend.Insurance.Image.Config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dysq7gol8",
                "api_key", "248371713862635",
                "api_secret", "dE_7pHCem3NCPenN2C8nHgcjCEc",
                "secure", true
        ));
    }
}
