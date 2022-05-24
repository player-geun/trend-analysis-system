import CryptoJS from "crypto-js";
import axios from 'axios';
import dbInit from "../dbInit.js"
import keywordModel from "../models/Keyword.js";

dbInit();

export default async function handler(req, res) {
  const categoryName = req.query.categoryName;
  const keywords = [];
  const startDate = req.query.startDate.replace('/', '-').replace('/', '-');
  const endDate = req.query.endDate.replace('/', '-').replace('/', '-');

  const keywordModels = await findCategory(categoryName);
  if(keywordModels.length == 0) {
    return res.status(200).json({ 
        isSuccess : false,
        code: 4000,
        message: `데이터베이스에서 ${categoryName} 카테고리를 찾을 수 없습니다.`
    });
  } else {
    keywordModels.forEach(model => {
        keywords.push(model.keywordName);
    });
  }

  const [absoluteValuePerOneRatio, changedKeywords] = await getAbsolutesPerOneRatio(keywords);
  const absoluteValuesEachDate = await getAbsoluteValuesEachDate(startDate, endDate, changedKeywords, absoluteValuePerOneRatio);

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
const getAbsolutesPerOneRatio = async(keywords) => {
  let result;
  const [recentMonthAbsoluteValue, changedKeywords] = await getRecentMonthAllAbsoluteValue(keywords);
  const recentMonthRatio = await getRecentMonthAllRatio(changedKeywords);
  result = recentMonthAbsoluteValue / recentMonthRatio;
  return [result, changedKeywords];
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

const getRecentMonthAllRatio = async(keywords) => {
  let result = 0;
  const [start, end] = getLastMonthDate();
  const recentMonthTrendAnalysisData = await getTrendAnalysisData(start, end, keywords);
  recentMonthTrendAnalysisData.results.forEach(keywordInfo => {
    let allRatio = 0;
    keywordInfo.data.forEach(data => {
      allRatio += data.ratio;
    })
    result += allRatio;
  })
  
  return result;
}

// 조회기간에서 각 날짜당 검색량을 구하는 부분
const getAbsoluteValuesEachDate = async(startDate, endDate, keywords, absoluteValuePerOneRatio) => {
  const trendAnalysisData = await getTrendAnalysisData(startDate, endDate, keywords);

  const result = [];
  
  keywords.forEach((keyword, index) => {
    const keywordAmountArray = [];
    trendAnalysisData.results[index].data.forEach(data => {
      keywordAmountArray.push({
        period : data.period,
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

const findCategory = async(categoryName) => {
    const data = await keywordModel.find({categoryName : categoryName});
    return data;
}