package com.trendanalysis.service;

import com.trendanalysis.dto.ChartRequestDTO;
import com.trendanalysis.dto.ChartResponseDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChartService {

    public ChartResponseDTO listSearchAmount(ChartRequestDTO chartRequestDTO) {
        ChartResponseDTO chartResponseDTO = new ChartResponseDTO();
        Map<String, List<Integer>> map = new LinkedHashMap<>();
        String keyword = chartRequestDTO.getKeyword();

        map.put(keyword, findSearchAmount(keyword));
        chartResponseDTO.setSearchAmount(map);

        return chartResponseDTO;
    }

    private List<Integer> findSearchAmount(String keyword) {
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            list.add(i);
        }

        return list;
    }
}
