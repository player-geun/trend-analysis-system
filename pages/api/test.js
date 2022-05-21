import CryptoJS from "crypto-js";
import axios from 'axios';

let method = "GET";
let timestamp = Date.now() + '';
let api_url = "/keywordstool";
let secretKey = "AQAAAACT7uHudX4LLpvV/vgpgD2ZYQ67SnPhqeOMWzEfK+rlqA==";
let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
hmac.update(timestamp + '.' + method + '.' + api_url);
let hash = hmac.finalize();
let sig = hash.toString(CryptoJS.enc.Base64); // 여기 까지 naver 검색광고 api 시그니쳐 키 만드는 코드 sig가 시그니처키가 됨!!

export default async function handler(req, res) {
  const keywords = req.query.keywords.split(',');

  const adSearchData = await getAdSearchData(keywords);

  const trendAnalysisData = await getTrendAnalysisData(keywords);

  console.log(trendAnalysisData);

  return res.status(200).json(trendAnalysisData);

}

const getAdSearchData = async (hintKeywords) => {
  let url = 'https://api.naver.com/keywordstool?hintKeywords='+ encodeURI(hintKeywords) + '&showDetail=1';

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

  return await result.data;

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