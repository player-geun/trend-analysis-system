package com.trendanalysis.service;

import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public void save(Category category) {
        categoryRepository.save(category);
    }

    public Category findOne(ObjectId categoryId) {
        return categoryRepository.findById(categoryId).get();
    }

    public Category findOne(String categoryName) {
        return categoryRepository.findByName(categoryName);
    }

    public List<Category> findChild(String id) {
        return categoryRepository.findAllByParentId(id);
    }

    public void delete(ObjectId id) {
        categoryRepository.deleteById(id);
    }

    public Category update(Category updatedCategory, List<String> keywordNames, ObjectId id) {
        Category category = findOne(id);
        int i = 0;

        for (Keyword keyword : category.getKeywords()) {
            keyword.update(Keyword.builder()
                    .name(keywordNames.get(i++))
                    .categories(keyword.getCategories())
                    .build());
        }

        category.update(updatedCategory);
        categoryRepository.save(category);

        return category;
    }
}
