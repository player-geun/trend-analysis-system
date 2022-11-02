package com.trendanalysis.service;

import com.trendanalysis.entity.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Rollback
class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    public void 카테고리_저장() throws Exception {
        //given
        Category category = Category.builder().name("커피").keywords("아메리카노").build();

        //when
        categoryService.save(category);
        Category findCategory = categoryService.findOne(category.getId());

        //then
        assertThat(category.getId()).isEqualTo(findCategory.getId());

    }

    @Test
    public void 카테고리_조회() throws Exception {
        //given
        String categoryName = "커피";

        //when
        Category category = categoryService.findOne(categoryName);

        //then
        assertThat("커피").isEqualTo(category.getName());

    }

    @Test
    public void 카테고리_수정() throws Exception {
        //given
        Category category = categoryService.findOne("커피");
        Category updatedCategory = Category.builder().name("스타벅스").keywords("아메리카노").build();

        //when
        Category newCategory = categoryService.update(updatedCategory, "커피");

        //then
        assertThat(updatedCategory.getName()).isEqualTo(newCategory.getName());
    }

    @Test
    public void 카테고리_삭제() throws Exception {
        //given
        String categoryName = "스타벅스";

        //when
        categoryService.delete(categoryName);

        //then
        assertThat(categoryService.findOne("스타벅스")).isNull();

    }
}