package com.trendanalysis.controller;

import com.trendanalysis.entity.Category;
import com.trendanalysis.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    //카테고리 이름으로 검색
    @GetMapping("/")
    public Category list(@RequestParam String categoryName) {
        Category category = categoryService.findOne(categoryName);

        return category;
    }

//    //카테고리 아이디로 검색
//    @GetMapping("/")
//    public Category list(@RequestParam ObjectId categoryId) {
//        Category category = categoryService.findOne(categoryId);
//        System.out.println(category.getId());
//        return category;
//    }

    @GetMapping("/all")
    public List<Category> listAll() {
        List<Category> categoryList = categoryService.findAll();

        return categoryList;
    }

    @PostMapping("/")
    public void create(@RequestBody Category category) {
        categoryService.save(category);
    }

    @PutMapping("/{name}")
    public Category updateCategory(@RequestBody Category category, @PathVariable String name) {
        Category updatedCategory = categoryService.update(category, name);

        return updatedCategory;
    }

    @DeleteMapping("/{name}")
    public void deleteCategory(@PathVariable String name) {
        categoryService.delete(name);
    }
}
