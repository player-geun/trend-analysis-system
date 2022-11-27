package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartCategoryResponseDto {

    private ChartResponseDto parentCategory;

    private ChartResponseDto category;

    private List<ChartResponseDto> childCategory;
}
