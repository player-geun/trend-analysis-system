package com.trendanalysis.dto;

import lombok.Data;

import java.util.List;

@Data
public class KeywordRequestDto {

    private String name;

    private List<String> categoryNames;
}
