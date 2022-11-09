package com.trendanalysis.naver;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Service
@RequiredArgsConstructor
public class NaverAdService {

    private final ObjectMapper objectMapper;
    private String baseUrl = "https://api.naver.com";
    private String path = "/keywordstool";
    private String accessKey = "0100000000156a6a89a96819ead37d2b04e7ca15ea9affbcd61eb3654cfce6107c3b48375a"; // 액세스키
    private String secretKey = "AQAAAAAVamqJqWgZ6tN9KwTnyhXqJPqRTb1LWckHl7DdEzrZ0Q==";  // 시크릿키
    private String customerId = "2710830";  // ID


    public NaverAdResponseDto requestKeyword(String keyword) {

        String parameter = "hintKeywords=";
        long timeStamp = System.currentTimeMillis();
        URL url = null;
        String times = String.valueOf(timeStamp);

        try {
            keyword = URLEncoder.encode(keyword, "UTF-8");
            //keyword = URLEncoder.encode(keyword, "EUC-KR");
        } catch (Exception e) {
            throw new RuntimeException("인코딩 실패.");
        }

        try {
            url = new URL(baseUrl+path+"?"+parameter+keyword);
            String signature = Signatures.of(times, "GET", path, secretKey);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod("GET");
            con.setRequestProperty("X-Timestamp", times);
            con.setRequestProperty("X-API-KEY", accessKey);
            con.setRequestProperty("X-Customer", customerId);
            con.setRequestProperty("X-Signature", signature);
            con.setDoOutput(true);

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
            }
            else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream(), "UTF-8"));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            NaverAdResponseDto naverAdResponseDto =
                    objectMapper.readValue(response.toString().replace("< 10", "5"), NaverAdResponseDto.class);

            return naverAdResponseDto;

        } catch (Exception e) {
            throw  new RuntimeException(e);
        }
    }
}
