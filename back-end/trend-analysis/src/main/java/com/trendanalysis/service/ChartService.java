package com.trendanalysis.service;

import com.trendanalysis.domain.Category;
import com.trendanalysis.domain.Keyword;
import com.trendanalysis.dto.ChartCategoryResponseDto;
import com.trendanalysis.dto.ChartResponseDto;
import com.trendanalysis.naver.*;
import com.trendanalysis.repository.CategoryRepository;
import com.trendanalysis.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.trendanalysis.dto.ChartResponseDto.*;
import static com.trendanalysis.naver.NaverSearchRequestDto.*;
import static com.trendanalysis.naver.NaverSearchResponseDto.*;

@Service
@RequiredArgsConstructor
public class ChartService {

    private final NaverSearchService naverSearchService;
    private final NaverAdService naverAdService;
    private final CategoryRepository categoryRepository;
    private final KeywordRepository keywordRepository;

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

    public ChartCategoryResponseDto listSearchAmount(String categoryName,
                                             String startedAt,
                                             String endedAt) {

        List<ChartResponseDto> list = null;
        Category category = categoryRepository.findByName(categoryName);

        ChartResponseDto result = null;
        ChartResponseDto parentResult = null;

        //해당 카테고리의 키워드 검색량 조회
        if (category.getKeywords().size() != 0) {
            result = listDataByCategory(category, startedAt, endedAt);
        }


        //해당 카테고리의 부모 카테고리 키워드 검색량 조회
        if (!Objects.equals(category.getParentId(), "")) {
            Category parentCategory = categoryRepository.findById(new ObjectId(category.getParentId())).get();
            if (parentCategory.getKeywords() == null) {
                parentResult = null;
            } else {
                parentResult = listDataByCategory(parentCategory, startedAt, endedAt);
            }
        }

        //해당 카테고리의 자식 카테고리 키워드 검색량 조회
        List<Category> child = categoryRepository.findAllByParentId(category.getId().toString());

        if (child.size() != 0) {
            list = new ArrayList<>();
            for (Category childCategory : child) {
                if (childCategory.getKeywords().size() != 0) {
                    list.add(listDataByCategory(childCategory, startedAt, endedAt));
                }
            }
        }

        return new ChartCategoryResponseDto(parentResult, result, list);
    }

    private ChartResponseDto listDataByCategory(Category category, String startedAt, String endedAt) {
        List<ObjectId> keywordIds = category.getKeywords();
        List<String> keywordNames = new ArrayList<>();

        for (ObjectId id : keywordIds) {
            Keyword keyword = keywordRepository.findById(id).get();
            keywordNames.add(keyword.getName());
        }

        return listSearchAmount(keywordNames, startedAt, endedAt);
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
}
