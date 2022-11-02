package com.trendanalysis.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ChartResponseDTO {

    Map<String, List<Integer>> searchAmount;
}
