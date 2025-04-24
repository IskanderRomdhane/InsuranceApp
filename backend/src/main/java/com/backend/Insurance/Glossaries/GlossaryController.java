package com.backend.Insurance.Glossaries;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/glossary")
public class GlossaryController {
    private final GlossaryService glossaryService;

    public GlossaryController(GlossaryService glossaryService) {
        this.glossaryService = glossaryService;
    }

    @GetMapping
    public List<Glossary> getAllTerms(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false, defaultValue = "All") String category) {
        return glossaryService.searchTerms(search, category);
    }

    @PostMapping
    public Glossary createTerm(@RequestBody Glossary glossary) {
        return glossaryService.createTerm(glossary);
    }
}
