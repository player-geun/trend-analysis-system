package com.trendanalysis.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ChartRequestDTO {

    private String keyword;

    private LocalDateTime startedAt;

    private LocalDateTime endedAt;
}
