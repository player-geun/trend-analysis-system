package com.trendanalysis.dto;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
public class ChartRequestDto {

    private String keywordName;

    private LocalDateTime startedAt;

    private LocalDateTime endedAt;
}
