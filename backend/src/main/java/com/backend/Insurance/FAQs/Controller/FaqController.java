package com.backend.Insurance.FAQs.Controller;

import com.backend.Insurance.FAQs.Entity.Faq;
import com.backend.Insurance.FAQs.Service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
public class FaqController {

    @Autowired
    private FaqService faqService;

    @GetMapping
    public List<Faq> getAllFaqs() {
        return faqService.getAllFaqs();
    }

    @GetMapping("/{id}")
    public Faq getFaqById(@PathVariable Long id) {
        return faqService.getFaqById(id);
    }

    @PostMapping
    public Faq createFaq(@RequestBody Faq faq) {
        return faqService.createFaq(faq);
    }

    @PutMapping("/{id}")
    public Faq updateFaq(@PathVariable Long id, @RequestBody Faq faq) {
        return faqService.updateFaq(id, faq);
    }

    @DeleteMapping("/{id}")
    public void deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
    }
}
