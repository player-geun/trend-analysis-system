package com.trendanalysis.repository;

import com.trendanalysis.domain.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
    Category findByName(String Name);

    void deleteByName(String Name);

     List<Category> findAllByParentId(String id);
}
