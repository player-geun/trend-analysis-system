package com.trendanalysis.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Document(collection = "category")
@Getter
public class Category {

    @Id
    @Setter
    private ObjectId id;

    private String name;

    private List<Keyword> keywords;

    private String parentId;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public Category(String name, List<Keyword> keywords, String parentId) {
        this.name = name;
        this.keywords = keywords;
        this.parentId = parentId;
    }

    public void update(Category updatedCategory){
        Optional.ofNullable(updatedCategory.getName())
                .ifPresent(none -> this.name = updatedCategory.getName());
        Optional.ofNullable(updatedCategory.getKeywords())
                .ifPresent(none -> this.keywords = updatedCategory.getKeywords());
        Optional.ofNullable(updatedCategory.getParentId())
                .ifPresent(none -> this.parentId = updatedCategory.getParentId());
    }
}
