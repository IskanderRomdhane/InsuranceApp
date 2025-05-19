package com.backend.Insurance.Glossaries.Service;

import com.backend.Insurance.Glossaries.Entity.Glossary;
import com.backend.Insurance.Glossaries.Repository.GlossaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlossaryServiceImpl implements GlossaryService {
    private final GlossaryRepository glossaryRepository;

    public GlossaryServiceImpl(GlossaryRepository glossaryRepository) {
        this.glossaryRepository = glossaryRepository;
    }

    @Override
    public List<Glossary> getAllTerms() {
        return glossaryRepository.findAll();
    }

    @Override
    public List<Glossary> searchTerms(String keyword, String category) {
        if (!category.equalsIgnoreCase("All")) {
            return glossaryRepository.findAll().stream()
                    .filter(g -> g.getCategory().equalsIgnoreCase(category) &&
                            (g.getTerm().toLowerCase().contains(keyword.toLowerCase()) ||
                                    g.getDefinition().toLowerCase().contains(keyword.toLowerCase())))
                    .toList();
        }
        return glossaryRepository.findByTermContainingIgnoreCaseOrDefinitionContainingIgnoreCase(keyword, keyword);
    }

    @Override
    public Glossary createTerm(Glossary glossary) {
        return glossaryRepository.save(glossary);
    }
}
