import axios from "axios";
import CryptoJS from "crypto-js";

export default function handler(res,req){
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
      let url = "https://openapi.naver.com/v1/datalab/search";
      var result = null;
      
    
      const postAPI = async() => {
        const result = await axios.post(url,
          {
            startDate: "2021-01-01",
            endDate: "2022-04-01",
            timeUnit: "week",
            keywordGroups: [
              {
                groupName: "포켓몬",
                keywords: [
                  "포켓몬",
                  "pokemon"
                ]
              },
              {
                groupName: "항공대",
                keywords: [
                  "항공대학교",
                  "한국항공대학교",
                  "항공대"
                ]
              }
            ],
            device: "pc",
            ages: [
              
            ],
            gender: ""
          }, 
          { 
            headers: { 
              'Content-type': 'application/json', 
              'Accept': 'application/json',
              'X-Naver-Client-Id' : "2tULlklliDs1_lg6P1Zl",
              'X-Naver-Client-Secret' : "Cg0ZbbCX1W",
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            } 
          } 
        )
        .then(r => {
            console.log("SUCCESS-");
            result = r.data;
            console.log(result);
            res.status(200).json(result)
          })
        .catch((response) => { 
            // Failure
            console.log('Error!!-')
          })
        
      }
    })
    .catch((response) => { 
      // Failure
      console.log(sig,timestamp)
      console.log('Error!!!')
    })
  }
}

