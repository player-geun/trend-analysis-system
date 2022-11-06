package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ChartResponseDto {

    private String keywordName;

    private List<Integer> searchAmount;
}
