package com.trendanalysis.naver;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NaverSearchResponseDto {

    private String startDate;
    private String endDate;
    private String timeUnit;
    private List<Key> results;

    @lombok.Data
    public static class Key {
        private String title;
        private List<String> keywords;
        private List<Data> data;
    }

    @lombok.Data
    public static class Data {
        private String period;
        private Integer ratio;
    }
}
