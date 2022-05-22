import CryptoJS from "crypto-js";
import axios from 'axios';



export default async function handler(req, res) {
  let keywords = req.query.words.replace(/ /g, '').split(',');
  if (keywords.length > 5) {
    return res.status(200).json({
        isSuccess : false,
        code : 4001,
        message : "키워드 갯수가 5개를 초과했습니다.",
    });
  } 
  const searchAllAmounts = [];

  const adSearchData = await getAdSearchData(keywords);
  const keywordAllRatios = [];

  // 네이버 광고 검색 API의 결과순서가 입력 키워드의 순서랑 다름. 
  // 트렌드 분석 API에서 검색 광고 결과와 똑같은 순서로 요청하기 위해 아래 코드 작성 함.
  keywords = [];
  adSearchData.forEach(obj => {
    keywords.push(obj.relKeyword);
    searchAllAmounts.push(obj.monthlyPcQcCnt + obj.monthlyMobileQcCnt)
  });

  const trendAnalysisData = await getTrendAnalysisData(keywords);

  trendAnalysisData.results.forEach(obj => {
    let allRatio = 0;
    obj.data.forEach(data => {
      allRatio += data.ratio;
    })
    keywordAllRatios.push(allRatio);
  });

  const searchEachAmounts = [];
  
  keywords.forEach((keyword, index) => {
    const keywordAmountArray = [];
    trendAnalysisData.results[index].data.forEach(data => {
      keywordAmountArray.push({
        period : data.period,
        amount : (data.ratio / keywordAllRatios[index]) * searchAllAmounts[index]
      })
    })
    searchEachAmounts.push({
      keyword : keyword,
      keywordAmountArray : keywordAmountArray
    })
  });

  const result = {
    startDate : trendAnalysisData.startDate,
    endDate : trendAnalysisData.endDate,
    searchKeywordInfos : searchEachAmounts
  };  

  return res.status(200).json({
      isSuccess : true,
      code : 1000,
      message : "성공",
      result : result
  });

//   return res.status(403).json({
//     isSuccess : true,
//     code : 2000,
//     message : "데이터 호출에 실패했습니다."
//   })

}

const getAdSearchData = async (hintKeywords) => {
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

const getTrendAnalysisData = async(keywords) => {
  const keywordGroups = [];

  const [start, end] = getLastMonthDate();

  keywords.forEach(keyword => {
    keywordGroups.push({
      groupName: keyword,
      keywords: [keyword] 
    })
  });

  try {
    const request_body = {
      startDate: start,
      endDate: end,
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
      console.log(error);
    }
}

const getLastMonthDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const todayString = year + '-' + month  + '-' + day;

  const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
  const agoYear = oneMonthAgo.getFullYear();
  const agoMonth = ('0' + (oneMonthAgo.getMonth() + 1)).slice(-2);
  const agoDay = ('0' + oneMonthAgo.getDate()).slice(-2);

  const oneMonthAgoString = agoYear + '-' + agoMonth  + '-' + agoDay;

  return [oneMonthAgoString, todayString];
}