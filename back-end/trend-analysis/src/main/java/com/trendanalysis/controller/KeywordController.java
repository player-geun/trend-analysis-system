package com.trendanalysis.controller;

import com.trendanalysis.dto.KeywordRequestDto;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.dto.KeywordResponseDto;
import com.trendanalysis.service.KeywordService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/keyword")
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;

    @GetMapping("/{keywordId}")
    public Response<KeywordResponseDto> list(@PathVariable ObjectId keywordId) {
        return new Response<KeywordResponseDto>(true, 1000, keywordService.findOne(keywordId));
    }

    @PostMapping("/")
    public Response<Id> create(@RequestBody KeywordRequestDto keywordRequestDto) {
        List<ObjectId> list = new ArrayList<>();

        Keyword keyword = Keyword.builder()
                .name(keywordRequestDto.getName())
                .categories(list)
                .build();

        Keyword save = keywordService.save(keyword, keywordRequestDto.getCategoryNames());

        return new Response<Id>(true, 1000, new Id(save.getId().toString()));
    }

    @PutMapping("/{keywordId}")
    public Response<KeywordResponseDto> updateKeyword(@RequestBody KeywordRequestDto keywordRequestDto, @PathVariable ObjectId keywordId) {
        Keyword updatedKeyword = keywordService
                .update(keywordRequestDto.getName(), keywordRequestDto.getCategoryNames(), keywordId);

        return new Response<KeywordResponseDto>(true, 1000, new KeywordResponseDto(
                updatedKeyword.getId().toString(),
                updatedKeyword.getName(),
                updatedKeyword.getCategories().stream().map(ObjectId::toString).collect(Collectors.toList()),
                updatedKeyword.getCreatedAt()
        ));
    }

    @DeleteMapping("/{keywordId}")
    public Response<Object> deleteKeyword(@PathVariable ObjectId keywordId) {
        keywordService.delete(keywordId);

        return new Response<Object>(true, 1000, null);
    }

    @Data
    @AllArgsConstructor
    private class Id {
        private String id;
    }

    @Data
    @AllArgsConstructor
    private class Response <T> {
        private Boolean isSuccess;

        private Integer code;

        private T result;
    }
}
