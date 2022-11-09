package com.trendanalysis.naver;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NaverSearchRequestDto {

    private String startDate;
    private String endDate;
    private String timeUnit;
    private List<KeywordGroup> keywordGroups;

    @Data
    @AllArgsConstructor
    public static class KeywordGroup {

        private String groupName;
        private List<String> keywords;
    }
}
