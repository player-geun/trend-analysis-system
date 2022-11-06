package com.trendanalysis.dto;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
public class ChartRequestDto {

    private String keyword;

    private LocalDateTime startedAt;

    private LocalDateTime endedAt;
}
