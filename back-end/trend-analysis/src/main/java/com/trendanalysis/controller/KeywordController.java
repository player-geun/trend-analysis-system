package com.trendanalysis.controller;

import com.trendanalysis.dto.KeywordRequestDto;
import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.service.KeywordService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/keyword")
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;

    @GetMapping("/")
    public void list() {

    }

    @PostMapping("/")
    public Id create(@RequestBody KeywordRequestDto keywordRequestDto) {
        List<Category> list = new ArrayList<>();

        Keyword keyword = Keyword.builder()
                .name(keywordRequestDto.getName())
                .categories(list)
                .build();

        Keyword save = keywordService.save(keyword, keywordRequestDto.getCategoryNames());

        return new Id(save.getId().toString());
    }

    @PutMapping("/{keywordId}")
    public void updateKeyword() {

    }

    @DeleteMapping("/{keyword}")
    public void deleteKeyword() {

    }

    @Data
    @AllArgsConstructor
    private class Id {
        private String id;
    }
}
