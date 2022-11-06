package com.trendanalysis.service;

import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.repository.CategoryRepository;
import com.trendanalysis.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final CategoryRepository categoryRepository;

    public void save(Keyword keyword, List<String> categoryNames) {
        if (keywordRepository.findByName(keyword.getName()) != null) {
            throw new IllegalStateException("이미 존재하는 키워드입니다.");
        }
        List<Category> list = new ArrayList<>();

        for (String name : categoryNames) {
            Category category = categoryRepository.findByName(name);
            list.add(category);
        }

        Keyword newKeyword = Keyword.builder().name(keyword.getName()).categories(list).build();

        keywordRepository.save(newKeyword);

        for (String name : categoryNames) {
            Category category = categoryRepository.findByName(name);
            Keyword updatedKey = keywordRepository.findByName(keyword.getName());
            updatedKey.update(Keyword.builder()
                    .name(category.getName())
                    .categories(new ArrayList<Category>())
                    .build());

            category.getKeywords().add(updatedKey);
            categoryRepository.save(category);
        }
    }
}
