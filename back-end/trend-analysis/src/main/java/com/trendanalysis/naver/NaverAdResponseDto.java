package com.trendanalysis.naver;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NaverAdResponseDto {

    private List<AdKey> keywordList;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AdKey {
        private String relKeyword;
        private Integer monthlyPcQcCnt;
        private Integer monthlyMobileQcCnt;
    }
}
