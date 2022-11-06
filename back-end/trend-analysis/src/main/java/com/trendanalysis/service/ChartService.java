package com.trendanalysis.service;

import com.trendanalysis.dto.ChartRequestDto;
import com.trendanalysis.dto.ChartResponseDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChartService {

    public ChartResponseDto listSearchAmount(ChartRequestDto chartRequestDTO) {
        String keyword = chartRequestDTO.getKeywordName();

        return new ChartResponseDto(keyword, findSearchAmount(keyword));
    }

    private List<Integer> findSearchAmount(String keyword) {
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            list.add(i);
        }

        return list;
    }
}
