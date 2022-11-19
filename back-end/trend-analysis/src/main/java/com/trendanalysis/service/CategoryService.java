package com.trendanalysis.service;

import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.dto.CategoryRequestDto;
import com.trendanalysis.dto.CategoryResponseDto;
import com.trendanalysis.repository.CategoryRepository;
import com.trendanalysis.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final KeywordRepository keywordRepository;
    private final KeywordService keywordService;

    public Category save(Category category) throws IllegalStateException{
       if(categoryRepository.findByName(category.getName()) != null){
           throw new IllegalStateException("이미 존재하는 카테고리입니다.");
       }
           return categoryRepository.save(category);
    }

    public CategoryResponseDto findOne(ObjectId categoryId) throws IllegalStateException {
        Optional<Category> tempCategory = categoryRepository.findById(categoryId);
        if (!tempCategory.isPresent()) {
            throw new IllegalStateException("존재 하지 않는 카테고리 입니다.");
        }

        Category category = tempCategory.get();

        List<ObjectId> keywords = category.getKeywords();

        List<String> keywordNames = keywords.stream().map(id ->
                keywordRepository.findById(id).get().getName()).collect(Collectors.toList());


        return new CategoryResponseDto(
                category.getId().toString(),
                category.getName(),
                keywordNames,
                category.getParentId(),
                category.getCreatedAt()
        );
    }

    public Category findOne(String categoryName) {
        return categoryRepository.findByName(categoryName);
    }

    public List<Category> findChild(String id) {
        return categoryRepository.findAllByParentId(id);
    }

    public void deleteCategoryAndKeywords(ObjectId id) {

        List<Keyword> all = keywordRepository.findAll();

        for (Keyword keyword : all) {
            if (keyword.getCategories().contains(id)) {
                keyword.getCategories().remove(id);
                keywordRepository.save(keyword);
            }
        }

        categoryRepository.deleteById(id);
    }

    public Category update(CategoryRequestDto categoryRequestDto, ObjectId id) {
        Category originCategory = categoryRepository.findById(id).get();
        List<ObjectId> notUpdatedKeyword = new ArrayList<>();

        for (ObjectId keywordId : originCategory.getKeywords()) {
            if (!categoryRequestDto.getKeywordNames().contains(keywordRepository.findById(keywordId).get().getName())) {
                //해당 키워드 안에 카테고리 삭제
                Keyword keyword = keywordRepository.findById(keywordId).get();
                keyword.getCategories().remove(id);
                keywordRepository.save(keyword);
                notUpdatedKeyword.add(keywordId);
            }
        }

        //수정됬거나 삭제된 키워드 -> 모두 삭제
        for (ObjectId keywordId : notUpdatedKeyword) {
            originCategory.getKeywords().remove(keywordId);
        }

        //변경되지 않은 키워드 추가
        for (String keywordName : categoryRequestDto.getKeywordNames()) {
            if (keywordRepository.findByName(keywordName) == null) {
                List<ObjectId> list = new ArrayList<>();
                List<String> categoryNames = new ArrayList<>();
                Keyword keyword = Keyword.builder().name(keywordName).categories(list).build();

                if (!Objects.equals(categoryRequestDto.getParentId(), "")) {
                    Category category = categoryRepository.findById(new ObjectId(categoryRequestDto.getParentId())).get();
                    categoryNames.add(category.getName());
                }

                Category category = categoryRepository.findById(id).get();
                categoryNames.add(category.getName());

                keywordService.save(keyword, categoryNames);
            }

            if (!originCategory.getKeywords()
                    .contains(keywordRepository.findByName(keywordName).getId())) {
                Keyword keyword = keywordRepository.findByName(keywordName);
                originCategory.getKeywords().add(keyword.getId());

            }
        }

        Category updatedCategory = Category.builder()
                .name(categoryRequestDto.getName())
                .keywords(originCategory.getKeywords())
                .parentId(originCategory.getParentId())
                .build();


        originCategory.update(updatedCategory);
        categoryRepository.save(originCategory);

        return originCategory;
    }
}
