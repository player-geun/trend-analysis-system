package com.trendanalysis.controller;

import com.trendanalysis.dto.ChartRequestDto;
import com.trendanalysis.dto.ChartResponseDto;

import com.trendanalysis.service.ChartService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/chart")
@RequiredArgsConstructor
public class ChartController {

    private final ChartService chartService;

    @PostMapping("/keyword")
    public Response<ChartResponseDto> ListDataAmount(@RequestBody ChartRequestDto chartRequestDto) {

        return new Response<>(true, 1000,
                chartService.listSearchAmount(
                        chartRequestDto.getKeywordNames(),
                        chartRequestDto.getStartDate().toString(),
                        chartRequestDto.getEndDate().toString()));
    }

    @Data
    @AllArgsConstructor
    private class Response <T> {
        private Boolean isSuccess;

        private Integer code;

        private T result;
    }
}
