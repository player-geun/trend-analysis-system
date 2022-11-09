package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class KeywordResponseDto {

    private String id;

    private String name;

    private List<String> categories;

    private LocalDateTime createdAt;
}
