package com.trendanalysis.repository;

import com.trendanalysis.domain.Keyword;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends MongoRepository<Keyword, ObjectId> {

    Keyword findByName(String Name);
}
