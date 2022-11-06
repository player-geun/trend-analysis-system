package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class CategoryResponseDto {

    private String id;
    private String name;
    private List<String> keywordNames;
    private String parentId;
    private LocalDateTime createdAt;
}
