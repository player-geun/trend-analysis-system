//데이터 전체 조회
//- GET api/all-data
import dbInit from './dbInit.js';
import keywordModel from './models/Keyword.js';

dbInit();

export default function handler(req, res) {
   
   const allKeywords = keywordModel();

   keywordModel.find(function(){
     if(req.method != "GET"){
       return res.status(200).json({
        isSuccess : false,
        code : 2000,
        message : "Wrong method.",
     });
    }else{
    

       return res.status(200).json({
        isScucess : true,
        code : 1000,
        message : "Successed.",
        result : ({ allKeywords }),
      });
    }
  });
}
