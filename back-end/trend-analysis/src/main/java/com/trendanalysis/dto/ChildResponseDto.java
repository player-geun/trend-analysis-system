package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChildResponseDto {

    private List<CategoryResponseDto> child;
}
