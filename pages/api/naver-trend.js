import axios from 'axios';
// 네이버 트랜드 분석 api 받아오기
export default function handler(req,res){
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
          'Content-type': 'application/json', 
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
        return res.status(200).json(result.data);
        }catch(error){
         console.log(error);
        }
}


 postAPI();

}
  // console.log(resultAPI);
  // res.status(200).json(resultAPI)