package com.trendanalysis.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Optional;

@Document(collection = "category")
@Getter
public class Category {

    @Id
    @Setter
    private ObjectId id;

    private String name;

//    private List<KeywordEntity> keywords;

    private String keywords;

    @Builder
    public Category(String name, String keywords) {
        this.name = name;
        this.keywords = keywords;
    }

    public void update(Category updatedCategory){
        Optional.ofNullable(updatedCategory.getName())
                .ifPresent(none -> this.name = updatedCategory.getName());
        Optional.ofNullable(updatedCategory.getKeywords())
                .ifPresent(none -> this.keywords = updatedCategory.getKeywords());
    }
}
