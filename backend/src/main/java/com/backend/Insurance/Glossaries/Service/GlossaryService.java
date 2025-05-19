package com.backend.Insurance.Glossaries.Service;

import com.backend.Insurance.Glossaries.Entity.Glossary;

import java.util.List;

public interface GlossaryService {
    List<Glossary> getAllTerms();
    List<Glossary> searchTerms(String keyword, String category);
    Glossary createTerm(Glossary glossary);
}
