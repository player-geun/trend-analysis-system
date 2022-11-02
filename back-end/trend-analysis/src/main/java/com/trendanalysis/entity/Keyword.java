package com.trendanalysis.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "keyword")
@Getter
public class Keyword {

    @Id
    @Setter
    private ObjectId id;

    private String name;

//    private List<CategoryEntity> categories;

    private String categories;

    @Builder
    public Keyword(String name, String categories) {
        this.name = name;
        this.categories = categories;
    }
}
