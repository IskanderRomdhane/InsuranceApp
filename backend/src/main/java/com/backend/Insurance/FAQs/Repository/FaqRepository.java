package com.backend.Insurance.FAQs.Repository;

import com.backend.Insurance.FAQs.Entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<Faq, Long> {
}
