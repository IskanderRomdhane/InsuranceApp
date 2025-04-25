package com.backend.Insurance.Glossaries;

import java.util.List;

public interface GlossaryService {
    List<Glossary> getAllTerms();
    List<Glossary> searchTerms(String keyword, String category);
    Glossary createTerm(Glossary glossary);
}
