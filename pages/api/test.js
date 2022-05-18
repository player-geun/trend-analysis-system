
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
      res.status(200).json(resultAPI)
      
      //만약 처음 호출이 성공 했을 경우 다음 api 불러오기 
      const postAPI=async()=>{
        try {
          const{
            startDate,
            endDate,
            timeUnit,
            device,
            gender,
            keywordGroups,
          }=req.body;
            const request_body = {
              startDate: startDate,
              endDate: endDate,
              timeUnit: timeUnit,
              device: device === "all" ? "" : device,
              gender: gender === "all" ? "" : gender,
              keywordGroups: keywordGroups,
            };
            console.log(req.body);
            const url = "https://openapi.naver.com/v1/datalab/search";
            const headers={ 
              'Content-type': 'application/json; charset=UTF-8', 
              'Accept': 'application/json',
              'X-Naver-Client-Id' :  "2tULlklliDs1_lg6P1Zl",
              'X-Naver-Client-Secret' : "Cg0ZbbCX1W",
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            } 
            const result = await axios.post(url, request_body, {
                headers: headers,
              });
             
            console.log(result.data);
            console.log("성공?")
            return res.status(200).json(result.data);
            }catch(error){
             console.log(error);
            }
    }
    postAPI();
    })
    .catch((response) => { 
      // Failure
      //console.log(sig,timestamp)
      console.log('Error!!!')
    })
  }
  GetAPI();

}