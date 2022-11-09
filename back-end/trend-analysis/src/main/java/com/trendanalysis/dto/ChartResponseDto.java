package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChartResponseDto {

    List<ChartKey> keywordList;

    @Data
    @AllArgsConstructor
    public static class ChartKey {
        private String keywordName;

        private List<Integer> searchAmount;
    }
}
