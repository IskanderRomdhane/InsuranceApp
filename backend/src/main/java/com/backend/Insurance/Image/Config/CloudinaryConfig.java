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
                "cloud_name", "djxwaaml6",
                "api_key", "285394988428552",
                "api_secret", "7T9yyxQjUq53ktn8SsvgiwlinwI",
                "secure", true
        ));
    }
}
