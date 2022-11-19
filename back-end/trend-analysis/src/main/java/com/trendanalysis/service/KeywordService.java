package com.trendanalysis.service;

import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.dto.KeywordResponseDto;
import com.trendanalysis.repository.CategoryRepository;
import com.trendanalysis.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final CategoryRepository categoryRepository;

    public KeywordResponseDto findOne(ObjectId keywordId) throws IllegalStateException {
        Optional<Keyword> tempKeyword = keywordRepository.findById(keywordId);

        if (!tempKeyword.isPresent()) {
            throw new IllegalStateException("존재하지 않는 키워드입니다.");
        }

        Keyword keyword = tempKeyword.get();

        List<ObjectId> categoryIds = keyword.getCategories();

        List<String> categoryNames = categoryIds.stream().map(id ->
                categoryRepository.findById(id).get().getName()).collect(Collectors.toList());


        return new KeywordResponseDto(
                keyword.getId().toString(),
                keyword.getName(),
                categoryNames,
                keyword.getCreatedAt()
        );
    }

    public Keyword save(Keyword keyword, List<String> categoryNames) throws IllegalStateException{
        if (keywordRepository.findByName(keyword.getName()) != null) {
            throw new IllegalStateException("이미 존재하는 키워드입니다.");
        }
        List<ObjectId> list = new ArrayList<>();

        for (String name : categoryNames) {
            Category category = categoryRepository.findByName(name);
            list.add(category.getId());
        }

        Keyword newKeyword = Keyword.builder().name(keyword.getName()).categories(list).build();

        Keyword save = keywordRepository.save(newKeyword);

        for (String name : categoryNames) {
            Category category = categoryRepository.findByName(name);
            Keyword updatedKey = keywordRepository.findByName(keyword.getName());
            updatedKey.update(Keyword.builder()
                    .name(updatedKey.getName())
                    .categories(new ArrayList<ObjectId>())
                    .build());

            category.getKeywords().add(updatedKey.getId());
            categoryRepository.save(category);
        }

        return save;
    }

    public Keyword update(String updatedKeywordName, List<String> categoryNames, ObjectId id) {
        Keyword originKeyword = keywordRepository.findById(id).get();
        List<ObjectId> notUpdatedCategory = new ArrayList<>();

        for (ObjectId categoryId : originKeyword.getCategories()) {
            if (!categoryNames.contains(categoryRepository.findById(categoryId).get().getName())) {
                //해당 카테고리 안에 키워드 삭제
                Category category = categoryRepository.findById(categoryId).get();
                category.getKeywords().remove(id);
                categoryRepository.save(category);
                notUpdatedCategory.add(categoryId);
            }
        }

        //수정됬거나 삭제된 카테고리 -> 모두 삭제
        for (ObjectId categoryId : notUpdatedCategory) {
            originKeyword.getCategories().remove(categoryId);
        }

        //변경되지 않은 카테고리 추가
        for (String categoryName : categoryNames) {
            Category temp = categoryRepository.findByName(categoryName);

            if (!originKeyword.getCategories()
                    .contains(categoryRepository.findByName(categoryName).getId())) {
                Category category = categoryRepository.findByName(categoryName);
                originKeyword.getCategories().add(category.getId());

                //새로운 카테고리에 키워드 추가
                temp.getKeywords().add(id);
                categoryRepository.save(temp);
            }
        }

        Keyword updatedKeyword = Keyword.builder()
                .name(updatedKeywordName)
                .categories(originKeyword.getCategories())
                .build();


        originKeyword.update(updatedKeyword);
        keywordRepository.save(originKeyword);

        return originKeyword;
    }

    public void delete(ObjectId id) {
        List<Category> all = categoryRepository.findAll();

        for (Category category : all) {
            if (category.getKeywords().contains(id)) {
                category.getKeywords().remove(id);
                categoryRepository.save(category);
            }
        }

        keywordRepository.deleteById(id);
    }
}
