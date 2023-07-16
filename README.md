# trend-analysis-system

## 📝 프로젝트 소개
한국항공대와 브래키츠의 산학협력 프로젝트 입니다. 검색어에 대한 기간별 검색량을 차트로 반환하는 프로그램 입니다.

## 🛠️ 백엔드 사용 기술
- Java 11
- Spring, Spring Boot(2.7.5)
- Spring Data MongoDB
- Gradle
- Mongo DB(6.0.1)
- AWS EC2

## 📅 백엔드 기술 개발 계획서
![image](https://github.com/player-geun/trend-analysis-system/assets/87115015/e6299f1d-d4b7-4943-8a6c-79740488769b)

## 🔍 API 성능 개선 결과
### 키워드별 검색량 API
약 439ms -> 약 9ms

| 시도 횟수 | Status | 개선 전 Time | 개선 후 Time | Size |
| --- | --- | --- | --- | --- |
| 1 | 200 OK | 435 | 9 | 737B |
| 2 | 200 OK | 456 | 8 | 737B |
| 3 | 200 OK | 512 | 11 | 737B |
| 4 | 200 OK | 389 | 7 | 737B |
| 5 | 200 OK | 401 | 8 | 737B |

![image](https://github.com/player-geun/trend-analysis-system/assets/87115015/2e238c04-1a33-4eba-9f8a-2c919ef661c5)

### 카테고리별 검색량 API
약 443 ms -> 약 11 ms

| 시도 횟수 | Status | 개선 전 Time | 개선 후 Time | Size |
| --- | --- | --- | --- | --- |
| 1 | 200 OK | 428 | 12 | 1.04KB |
| 2 | 200 OK | 411 | 16 | 1.04KB |
| 3 | 200 OK | 478 | 9 | 1.04KB |
| 4 | 200 OK | 464 | 8 | 1.04KB |
| 5 | 200 OK | 435 | 11 | 1.04KB |


## 📄 최종 정리
<img src="https://github.com/player-geun/trend-analysis-system/assets/87115015/1cb592a4-71fc-49ba-8648-401fd1893e83" style="width: 25vw;" />

