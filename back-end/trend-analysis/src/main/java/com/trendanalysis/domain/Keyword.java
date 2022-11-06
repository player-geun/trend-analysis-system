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

@Document(collection = "keyword")
@Getter
public class Keyword {

    @Id
    @Setter
    private ObjectId id;

    private String name;

    private List<Category> categories;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public Keyword(String name, List<Category> categories) {
        this.name = name;
        this.categories = categories;
    }

    public void update(Keyword updatedKeyword){
        Optional.ofNullable(updatedKeyword.getName())
                .ifPresent(none -> this.name = updatedKeyword.getName());
        Optional.ofNullable(updatedKeyword.getCategories())
                .ifPresent(none -> this.categories = updatedKeyword.getCategories());
    }
}
