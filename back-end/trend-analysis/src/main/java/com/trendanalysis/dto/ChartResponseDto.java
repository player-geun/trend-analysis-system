package com.trendanalysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ChartResponseDto {

    List<ChartKey> keywordList;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChartKey {
        private String keywordName;

        private List<Integer> searchAmount;
    }

    public ChartResponseDto(List<ChartKey> keywordList) {
        this.keywordList = keywordList;
    }
}
