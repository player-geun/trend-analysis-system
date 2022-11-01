// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req, res) {
  let url = "https://openapi.naver.com/v1/datalab/search";
  var resultAPI = null;

  const postAPI = async() => {
    const result = await axios.post(url,
      {
        startDate: "2021-01-01",
        endDate: "2022-05-01",
        timeUnit: "week",
        keywordGroups: [
          {
            groupName: "가방",
            keywords: [
              "가방"
            ]
          },
          {
            groupName: "여성가방",
            keywords: [
              "여성가방"
            ]
          },
          {
            groupName: "사첼백",
            keywords: [
              "사첼백"
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
          'X-Naver-Client-Id' : "mIQEETM0PAV3AGnKQGW6",
          'X-Naver-Client-Secret' : "v9xvcxrHDb",
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        } 
      } 
    )
      .then(r => {
        console.log("SUCCESS");
        resultAPI = r.data;
        console.log(resultAPI);
        res.status(200).json(resultAPI)
      })
      .catch((response) => { 
        // Failure
        console.log('Error!!')
      })
    
  }

  postAPI();

  // console.log(resultAPI);
  // res.status(200).json(resultAPI)
}
