package com.backend.Insurance.FAQs.Service;

import com.backend.Insurance.FAQs.Entity.Faq;

import java.util.List;

public interface FaqService {
    List<Faq> getAllFaqs();
    Faq getFaqById(Long id);
    Faq createFaq(Faq faq);
    Faq updateFaq(Long id, Faq faq);
    void deleteFaq(Long id);
}
