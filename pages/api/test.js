import CryptoJS from "crypto-js";
import axios from 'axios';

export default function handler(req, res) {
  var method = "GET";
  var timestamp = Date.now() + '';
  var api_url = "/keywordstool";
  var secretKey = "AQAAAACT7uHudX4LLpvV/vgpgD2ZYQ67SnPhqeOMWzEfK+rlqA==";
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(timestamp + '.' + method + '.' + api_url);
  var hash = hmac.finalize();
  var sig = hash.toString(CryptoJS.enc.Base64);
  var resultAPI = null;
  var result_api=null;
  
  
  let url = 'https://api.naver.com/keywordstool?hintKeywords='+ encodeURI(req.query.hintKeywords) + '&showDetail=1';
  const GetAPI = async() =>{
    const {
      hintKeywords
    }=req.body;
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
    }
  )
    .then(r => {
      console.log("success!")
      resultAPI = r.data;
      console.log(resultAPI);
      // 화면에 굳이 띄울 필요가 없다 그러면 오류가 발생하지 않는다!
      //return res.status(200).json(resultAPI)
     })   
      //만약 처음 호출이 성공 했을 경우 다음 api 불러오기 
  
    .catch((error) => { 
      // Failure
      //console.log(sig,timestamp)
      console.log(error)
    })
  }
 
  GetAPI();
  const postAPI=async()=>{
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
        
        console.log(result_api);
        //return res.status(200).json(result_api);
        }catch(error){
         console.log(error);
        }
}

 

 postAPI();

}