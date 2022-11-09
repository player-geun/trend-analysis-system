package com.trendanalysis.service;

import com.trendanalysis.dto.ChartResponseDto;
import com.trendanalysis.naver.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.trendanalysis.dto.ChartResponseDto.*;
import static com.trendanalysis.naver.NaverSearchRequestDto.*;
import static com.trendanalysis.naver.NaverSearchResponseDto.*;

@Service
@RequiredArgsConstructor
public class ChartService {

    private final NaverSearchService naverSearchService;
    private final NaverAdService naverAdService;

    public ChartResponseDto listSearchAmount(List<String> keywordNames,
                                                   String startedAt,
                                                   String endedAt) {

        List<Integer>[] dayRatio = new ArrayList[keywordNames.size() + 1];

        for (int i = 0; i < keywordNames.size(); i++) {
            dayRatio[i] = new ArrayList<>();
        }
        //구간의 ratio 요청
        NaverSearchResponseDto naverSearchResponseDto = requestRatio(keywordNames, startedAt, endedAt);
        //ratio 합계 계샨
        List<Integer> sumRatio = new ArrayList<>();
        int index = 0;
        for (Key key : naverSearchResponseDto.getResults()) {
            int sum = 0;
            for (Data data : key.getData()) {
                sum += data.getRatio();
                dayRatio[index].add(data.getRatio());
            }
            sumRatio.add(sum);
            index++;
        }

        //keyword 별 검색량 요청
        List<ChartKey> result = new ArrayList<>();
        int i = 0;
        for (String keywordName : keywordNames) {
            NaverAdResponseDto naverAdResponseDto = naverAdService.requestKeyword(keywordName);
            int researchAmount =
                    naverAdResponseDto.getKeywordList().get(0).getMonthlyMobileQcCnt() +
                            naverAdResponseDto.getKeywordList().get(0).getMonthlyPcQcCnt();

            int oneRatio = researchAmount / sumRatio.get(i);

            List<Integer> searchAmount = new ArrayList<>();
            for (Integer day : dayRatio[i]) {
                searchAmount.add(day * oneRatio);
            }
            ChartKey chartKey = new ChartKey(keywordName, searchAmount);
            result.add(chartKey);
            i++;
        }


        return new ChartResponseDto(result);
    }

    private NaverSearchResponseDto requestRatio(List<String> keywordNames, String startedAt, String endedAt) {
        KeywordGroup keywordGroup;
        List<KeywordGroup> keywordGroups = new ArrayList<>();

        for (String keywordName : keywordNames) {
            keywordGroup = new KeywordGroup(
                    keywordName, new ArrayList<>(Collections.singleton(keywordName)));
            keywordGroups.add(keywordGroup);
        }

        NaverSearchRequestDto request = new NaverSearchRequestDto(startedAt, endedAt, "date", keywordGroups);
        return naverSearchService.naverShopSearchAPI(request);
    }

    private List<Integer> findSearchAmount(String keyword) {
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            list.add(i);
        }

        return list;
    }
}
