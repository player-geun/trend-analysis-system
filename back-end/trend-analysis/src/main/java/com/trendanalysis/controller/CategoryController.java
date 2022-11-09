package com.trendanalysis.controller;

import com.trendanalysis.dto.*;
import com.trendanalysis.domain.Category;
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

    @GetMapping("/{categoryId}")
    public Response<CategoryResponseDto> list(@PathVariable ObjectId categoryId) {
        return new Response<CategoryResponseDto>(true, 1000, categoryService.findOne(categoryId));
    }

    @GetMapping("/child/{categoryId}")
    public Response<ChildResponseDto> listChild(@PathVariable String categoryId) {
        List<Category> child = categoryService.findChild(categoryId);

        List<CategoryResponseDto> newChild = child.stream().map(category -> new CategoryResponseDto(
                category.getId().toString(),
                category.getName(),
                null,
                category.getParentId(),
                category.getCreatedAt()
                )).collect(Collectors.toList());

        return new Response<ChildResponseDto>(true, 1000, new ChildResponseDto(newChild));
    }

    @PostMapping("/")
    public Response<Id> create(@RequestBody CategoryRequestDto categoryRequestDto) {
        List<ObjectId> list = new ArrayList<>();

        Category category = Category.builder()
                .name(categoryRequestDto.getName())
                .parentId(categoryRequestDto.getParentId())
                .keywords(list)
                .build();

        Category save = categoryService.save(category);

        return new Response<Id>(true, 1000, new Id(save.getId().toString()));
    }

    @PutMapping("/{categoryId}")
    public Response<CategoryResponseDto> updateKeyword(
            @RequestBody CategoryRequestDto categoryRequestDto, @PathVariable ObjectId categoryId) {

        Category updatedCategory = categoryService
                .update(categoryRequestDto, categoryId);

        return new Response<CategoryResponseDto>(true, 1000, new CategoryResponseDto(
                updatedCategory.getId().toString(),
                updatedCategory.getName(),
                updatedCategory.getKeywords().stream().map(ObjectId::toString).collect(Collectors.toList()),
                updatedCategory.getParentId(),
                updatedCategory.getCreatedAt()
        ));
    }

    @DeleteMapping("/{categoryId}")
    public Response deleteCategory(@PathVariable ObjectId categoryId) {
        categoryService.deleteCategoryAndKeywords(categoryId);

        return new Response(true, 1000, null);
    }

    @Data
    @AllArgsConstructor
    private class Id {
        private String id;
    }

    @Data
    @AllArgsConstructor
    private class Response <T> {
        private Boolean isSuccess;

        private Integer code;

        private T result;
    }
}
