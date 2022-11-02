package com.trendanalysis.repository;

import com.trendanalysis.entity.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
    Category findByName(String Name);

    void deleteByName(String Name);
}
