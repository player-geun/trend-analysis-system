package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChartCategoryResponseDto {

    private ChartResponseDto parentCategory;

    private ChartResponseDto category;

    private List<ChartResponseDto> childCategory;
}
