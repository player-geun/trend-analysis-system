// 유저 정보를 모두 조회하는 API

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
      console.log("success")
      resultAPI = r.data;
      console.log(resultAPI);
      res.status(200).json(resultAPI)
    })
    .catch((response) => { 
      // Failure
      console.log(sig,timestamp)
      console.log('Error!!')
    })
  }


  GetAPI();
}