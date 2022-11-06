package com.trendanalysis.controller;

import com.trendanalysis.dto.KeywordRequestDto;
import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.service.KeywordService;
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
    public void create(@RequestBody KeywordRequestDto keywordRequestDto) {
        List<Category> list = new ArrayList<>();

        Keyword keyword = Keyword.builder()
                .name(keywordRequestDto.getName())
                .categories(list)
                .build();

        keywordService.save(keyword, keywordRequestDto.getCategoryNames());
    }

    @PutMapping("/{keywordId}")
    public void updateKeyword() {

    }

    @DeleteMapping("/{keyword}")
    public void deleteKeyword() {

    }
}
