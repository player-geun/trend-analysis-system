import CryptoJS from "crypto-js";
import axios from 'axios';



export default async function handler(req, res) {
  let keywords = req.query.words.replace(/ /g, '').split(',');
  const startDate = req.query.startDate.replace('/', '-').replace('/', '-');
  const endDate = req.query.endDate.replace('/', '-').replace('/', '-');


  const startDateTest = req.query.startDate.split('/');
  const endDateTest = req.query.endDate.split('/');
  
  //키워드 5개 이상 입력했을 때 오류

  if (keywords.length > 5) {
    return res.status(200).json({
        isSuccess : false,
        code : 2001,
        message : "키워드 갯수가 5개를 초과했습니다.",
    });
  }
  // 날짜 잘못 입력했을때
  if(startDateTest[0] > endDateTest[0]){
    console.log("4")
    return res.status(200).json({
      isSuccess : false,
      code : 2002,
      message : "시작일 보다 마지막일이 더 먼저입니다.",
    });
  }
  if(startDateTest[0] === endDateTest[0] && startDateTest[1]>endDateTest[1]){
    console.log("2")
    return res.status(200).json({
      isSuccess : false,
      code : 2002,
      message : "시작일 보다 마지막일이 더 먼저입니다.",
    });
  }
  if(startDateTest[1] == endDateTest[1] && startDateTest[2] > endDateTest[2]){
    console.log("3")
    return res.status(200).json({
      isSuccess : false,
      code : 2002,
      message : "시작일 보다 마지막일이 더 먼저입니다.",
    });
  }


 
 

  const [absoluteValuePerOneRatio, trendAnalysisData, changedKeywords] = await getAbsolutesPerOneRatio(startDate, endDate, keywords);
  const absoluteValuesEachDate = await getAbsoluteValuesEachDate(startDate, endDate, changedKeywords, trendAnalysisData, absoluteValuePerOneRatio);


  
  const result = {
    startDate : startDate,
    endDate : endDate,
    searchKeywordInfos : absoluteValuesEachDate
  };  



  return res.status(200).json({
      isSuccess : true,
      code : 1000,
      message : "성공",
      result : result
  });


}

// 1ratio당 검색량을 구하는 부분
const getAbsolutesPerOneRatio = async(startDate, endDate, keywords) => {
  let result;
  // 검색광고
  const [recentMonthAbsoluteValue, changedKeywords] = await getRecentMonthAllAbsoluteValue(keywords);
  // 트렌드 분석
  const [recentMonthRatio, trendAnalysisData] = await getRecentMonthAllRatio(startDate, changedKeywords);
  result = recentMonthAbsoluteValue / recentMonthRatio;
  return [result, trendAnalysisData, changedKeywords];
}

const getRecentMonthAllAbsoluteValue = async(keywords) => {
  let result = 0;
  const adSearchData = await getAdSearchData(keywords);
  keywords = [];
  adSearchData.forEach(obj => {
    keywords.push(obj.relKeyword);
    result += obj.monthlyPcQcCnt + obj.monthlyMobileQcCnt;
  });
  return [result, keywords];
}

const getRecentMonthAllRatio = async(startDate, keywords) => {
  let result = 0;
  // 트렌드 분석 API 호출은 조회 시작 날짜로 부터 오늘까지의 데이터를 호출.
  const trendAnalysisData = await getTrendAnalysisData(startDate, getTodayDate(), keywords);
  trendAnalysisData.results.forEach(keywordInfo => {
    let allRatio = 0;
    const startToTodayLength = keywordInfo.data.length;
    keywordInfo.data.slice(startToTodayLength - 31, startToTodayLength).forEach(data => {
      allRatio += data.ratio;
    })
    result += allRatio;
  })
  
  return [result, trendAnalysisData];
}

// 조회기간에서 각 날짜당 검색량을 구하는 부분
const getAbsoluteValuesEachDate = async(startDate, endDate, keywords, trendAnalysisData, absoluteValuePerOneRatio) => {
  const result = [];
  
  keywords.forEach((keyword, index) => {
    const keywordAmountArray = [];
    trendAnalysisData.results[index].data.slice(0, getDiffBetweenTwoDates(startDate, endDate)).forEach(data => {
      keywordAmountArray.push({
        period : data.period,
        ratio : data.ratio,
        amount : data.ratio * absoluteValuePerOneRatio
      })
    })
    result.push({
      keyword : keyword,
      keywordAmountArray : keywordAmountArray
    })
  });

  return result;

}

const getAdSearchData = async(hintKeywords) => {
  const method = "GET";
  const timestamp = Date.now() + '';
  const api_url = "/keywordstool";
  const secretKey = "AQAAAACT7uHudX4LLpvV/vgpgD2ZYQ67SnPhqeOMWzEfK+rlqA==";
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(timestamp + '.' + method + '.' + api_url);
  const hash = hmac.finalize();
  const sig = hash.toString(CryptoJS.enc.Base64); // 여기 까지 naver 검색광고 api 시그니쳐 키 만드는 코드 sig가 시그니처키가 됨!!

  const url = 'https://api.naver.com/keywordstool?hintKeywords='+ encodeURI(hintKeywords) + '&showDetail=1';

  const result = await axios.get(url,{
    params:{
      hintKeywords : hintKeywords,
    },
    headers: {
      'X-Timestamp': timestamp,
      'X-API-KEY' : "010000000093eee1ee757e0b2e9bd5fef829803d99fbd1415645f7264bf42e5313cb5c06a8",
      'X-API-SECRET' : "AQAAAACT7uHudX4LLpvV/vgpgD2ZYQ67SnPhqeOMWzEfK+rlqA==",
      'X-CUSTOMER' : "2557032",
      'X-Signature': sig
    }
  });


  return await result.data.keywordList.slice(0, hintKeywords.length);

}



const getTrendAnalysisData = async(startDate, endDate, keywords) => {
  const keywordGroups = [];

  keywords.forEach(keyword => {
    keywordGroups.push({
      groupName: keyword,
      keywords: [keyword] 
    })
  });

  try {
    const request_body = {
      startDate: startDate,
      endDate: endDate,
      timeUnit: "date",
      keywordGroups: keywordGroups,
    };
    const url = "https://openapi.naver.com/v1/datalab/search";
    const headers={ 
      'Content-type': 'application/json', 
      'Accept': 'application/json',
      'X-Naver-Client-Id' :  "PKjTmaEjasvkR4a2qbEy",
      'X-Naver-Client-Secret' : "zQC7scyLbz",
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    } 
    const result = await axios.post(url, request_body, {
        headers: headers,
    });

    return result.data;

    } catch(error){
      // console.log(error);
    }
}

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const todayString = year + '-' + month  + '-' + day;

  return todayString;
}

const getDiffBetweenTwoDates = (_date1, _date2) => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);

  const diffDate = date1.getTime() - date2.getTime();
  const dateDays = Math.abs(diffDate / (1000 * 3600 * 24));
  
  return dateDays + 1;
}


/*

예시 1월 15일 부터 2월 15일까지를 조회하려는데 오늘은 5월 15일일때
1. 트렌드 분석 api로 1월 15일 부터 5월 15일까지 값 얻어옴
2. 광고 검색 api로 최근 한달 (4/15 - 5/15) 검색량 얻어옴
3. 1에서 얻어온 값으로 최근 한달 총 ratio 값 구함
4. 1ratio당 검색량 구하기
5. 조회하는 날짜간의 차이를 구한다
6. 1에서 구해놓은 값을 처음 인덱스 부터 5에서 구한 숫자만큼 순회하며 4에서 구한것을 곱해주며 절댓값 획득

*/