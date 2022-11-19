package com.trendanalysis.controller;

import com.trendanalysis.dto.ChartCategoryRequestDto;
import com.trendanalysis.dto.ChartCategoryResponseDto;
import com.trendanalysis.dto.ChartRequestDto;
import com.trendanalysis.dto.ChartResponseDto;

import com.trendanalysis.service.ChartService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @PostMapping("/category")
    public Response<ChartCategoryResponseDto> ListDataAmountByCategory(@RequestBody ChartCategoryRequestDto chartRequestDto) {

        return new Response<>(true, 1000,
                chartService.listSearchAmount(
                        chartRequestDto.getCategoryName(),
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
