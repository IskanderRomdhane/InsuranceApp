package com.backend.Insurance.FAQs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqServiceImpl implements FaqService {

    @Autowired
    private FaqRepository faqRepository;

    @Override
    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }

    @Override
    public Faq getFaqById(Long id) {
        return faqRepository.findById(id).orElseThrow(() -> new RuntimeException("FAQ not found"));
    }

    @Override
    public Faq createFaq(Faq faq) {
        return faqRepository.save(faq);
    }

    @Override
    public Faq updateFaq(Long id, Faq faqDetails) {
        Faq faq = getFaqById(id);
        faq.setQuestion(faqDetails.getQuestion());
        faq.setAnswer(faqDetails.getAnswer());
        return faqRepository.save(faq);
    }

    @Override
    public void deleteFaq(Long id) {
        faqRepository.deleteById(id);
    }
}
