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
let resultAPI = null;// 검색광고 api 결과담는 변수
let result_api = null;// 네이버 트랜드 api 결과 담는 변수

export default function handler(req, res) {
  const keywords = req.query.keywords.split(',');

  const adSearchData = getAdSearchData(keywords);

  console.log(adSearchData);

  getTrendAnalysisData(keywords);

  return res.status(200).json({"dd" : "aa"});

}

const getAdSearchData = async (hintKeywords) =>{
  let url = 'https://api.naver.com/keywordstool?hintKeywords='+ encodeURI(hintKeywords) + '&showDetail=1'; // 검색광고 url
  // const {
  //   hintKeywords
  // } = req.body; // 테스트 하려면 이 부분 주석 처리 하고 밑에 params: 부분에 검색하고 싶은 검색어를 hintkeywords 부분에 넣는다.
  const result = await axios.get(url,{
    params:{
      hintKeywords : hintKeywords, // parameter로 hintKeyword를 넘긴다 
    },
    headers: {
      'X-Timestamp': timestamp,
      'X-API-KEY' : "010000000093eee1ee757e0b2e9bd5fef829803d99fbd1415645f7264bf42e5313cb5c06a8",
      'X-API-SECRET' : "AQAAAACT7uHudX4LLpvV/vgpgD2ZYQ67SnPhqeOMWzEfK+rlqA==",
      'X-CUSTOMER' : "2557032",
      'X-Signature': sig
    }
  })

  // console.log(result.data);
  return await result.data;
  

  // return result;
  // .then(r => {
  //   console.log("success!")
  //   // resultAPI = r.data;
  //   return await r.data;
  //   // console.log(resultAPI);
  //   // 클라이언트 쪽에 데이터를 보내는 코드를 주석 처리 하면 오류 해결!
  //   // 만약 테스트를 하고 싶으면 console.log(resultAPI); 이부분 주석처리 하고 화면에 띄우는게 보기 더 편함
  //   //return res.status(200).json(resultAPI)
  //  })   
  

  // .catch((error) => { 
  //   // Failure
  //   console.log(error)
  // })
  // return await result;
}

const getTrendAnalysisData = async() => {
  try {
    const request_body = {
      startDate: "2017-10-01",
      endDate: "2020-10-30",
      timeUnit: "month",
      keywordGroups: [
        { groupName: "치킨", keywords: ["BBQ", "BHC", "교촌치킨"] },
        { groupName: "떡볶이", keywords: ["엽기떡볶이","신전떡볶이", "배떡"] },
      ],
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
      const api_result = await axios.post(url, request_body, {
          headers: headers,
      });
      
      result_api=api_result.data
      // console.log(result_api);
      //여기는 화면에 보여줌
      // return res.status(200).json(result_api);
      }catch(error){
       console.log(error);
      }
}