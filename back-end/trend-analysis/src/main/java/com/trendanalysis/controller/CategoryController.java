package com.trendanalysis.controller;

import com.trendanalysis.dto.CategoryRequestDto;
import com.trendanalysis.dto.CategoryResponseDto;
import com.trendanalysis.dto.ChildResponseDto;
import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{id}")
    public CategoryResponseDto list(@PathVariable ObjectId id) {
        Category category = categoryService.findOne(id);

        List<String> names = category.getKeywords().stream()
                .map(k -> k.getName()).collect(Collectors.toList());

        return new CategoryResponseDto(
                category.getId().toString(),
                category.getName(),
                names,
                category.getParentId(),
                category.getCreatedAt());
    }

    @GetMapping("/child/{id}")
    public ChildResponseDto listChild(@PathVariable String id) {
        List<Category> child = categoryService.findChild(id);

        List<CategoryResponseDto> newChild = child.stream().map(category -> new CategoryResponseDto(
                category.getId().toString(),
                category.getName(),
                null,
                category.getParentId(),
                category.getCreatedAt()
                )).collect(Collectors.toList());

        return new ChildResponseDto(newChild);
    }

    @PostMapping("/")
    public Id create(@RequestBody CategoryRequestDto categoryRequestDto) {
        List<Keyword> list = new ArrayList<>();

        Category category = Category.builder()
                .name(categoryRequestDto.getName())
                .parentId(categoryRequestDto.getParentId())
                .keywords(list)
                .build();

        Category save = categoryService.save(category);

        return new Id(save.getId().toString());
    }

    @PutMapping("/{id}")
    public CategoryResponseDto updateCategory(@RequestBody CategoryRequestDto categoryRequestDto, @PathVariable ObjectId id) {
        Category category = toCategory(categoryRequestDto);

        Category updatedCategory = categoryService.update(category, categoryRequestDto.getKeywordNames(), id);

        List<String> names = updatedCategory.getKeywords().stream()
                .map(k -> k.getName()).collect(Collectors.toList());

        return new CategoryResponseDto(
                updatedCategory.getId().toString(),
                updatedCategory.getName(),
                names,
                updatedCategory.getParentId(),
                updatedCategory.getCreatedAt());
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable ObjectId id) {
        categoryService.delete(id);
    }

    private Category toCategory(CategoryRequestDto categoryRequestDto) {
        List<Keyword> list = new ArrayList<>();

        Category category = Category.builder()
                .name(categoryRequestDto.getName())
                .parentId(categoryRequestDto.getParentId())
                .build();

        return category;
    }

    @Data
    @AllArgsConstructor
    private class Id {
        private String id;
    }
}
