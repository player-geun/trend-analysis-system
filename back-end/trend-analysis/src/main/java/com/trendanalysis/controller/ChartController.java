package com.trendanalysis.controller;

import com.trendanalysis.dto.ChartRequestDTO;
import com.trendanalysis.dto.ChartResponseDTO;
import com.trendanalysis.service.ChartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chart")
@RequiredArgsConstructor
public class ChartController {

    private final ChartService chartService;

    @GetMapping("/keyword")
    public ChartResponseDTO ListDataAmount(@RequestBody ChartRequestDTO chartRequestDTO) {
        ChartResponseDTO chartResponseDTO = chartService.listSearchAmount(chartRequestDTO);

        return chartResponseDTO;
    }
}
