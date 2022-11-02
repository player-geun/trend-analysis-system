package com.trendanalysis.service;

import com.trendanalysis.entity.Category;
import com.trendanalysis.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;

    public void save(Category category) {
        repository.save(category);
    }

    public Category findOne(ObjectId categoryId) {
        return repository.findById(categoryId).get();
    }

    public Category findOne(String categoryName) {
        return repository.findByName(categoryName);
    }

    public List<Category> findAll() {
        return repository.findAll();
    }

    public void delete(String categoryName) {
        repository.deleteByName(categoryName);
    }

    public Category update(Category updatedCategory, String name) {
        Category category = findOne(name);
        updatedCategory.setId(category.getId());
        category.update(updatedCategory);

        repository.save(category);

        return updatedCategory;
    }
}
