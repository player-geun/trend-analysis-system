package com.trendanalysis.naver;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class NaverSearchService {

    private final ObjectMapper objectMapper;

    public NaverSearchResponseDto naverShopSearchAPI(NaverSearchRequestDto naverSearchRequestDto) {
        String url = "https://openapi.naver.com/v1/datalab/search";
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Naver-Client-Id", "mB_aZmJhC5A5k6jgZMkY");
        headers.add("X-Naver-Client-Secret", "BOwYejh1Lx");

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<NaverSearchRequestDto> entity = new HttpEntity<>(naverSearchRequestDto, headers);
        ResponseEntity<String> result = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        try {
            return objectMapper.readValue(result.getBody(), NaverSearchResponseDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("제이슨 파싱 오류");
        }
    }
}
