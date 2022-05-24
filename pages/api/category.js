// 카테고리 저장 api
import dbInit from "./dbInit.js";
import keywordModel from "./models/Keyword.js";

dbInit();

export default async function handler(req, res) {
    const apiMethod = req.method;
    const reqBody = req.body;

    if (apiMethod == "POST") {
        const isSuccess = await saveKeywords(reqBody);

        if(isSuccess) {
            res.status(200).json({ 
                isSuccess : true,
                code: 1000,
                message: "카테고리 등록에 성공하셨습니다."
            })
        } else {
            res.status(200).json({ 
                isSuccess : false,
                code: 4000,
                message: "데이터베이스 에러."
            })
        }
    } else {
        res.status(200).json({ 
            isSuccess : false,
            code: 2000,
            message: "Method가 올바르지 않습니다."
        })
    }
}

const getTodayDate = () => {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
  
    const todayString = year + '/' + month  + '/' + day;
  
    return todayString;
}

const saveKeywords = async(reqBody) => {
    let isSuccess = true;
    const keywordModels = [];

    for(const keyword of reqBody.keywords) {
        keywordModels.push({
            keywordName : keyword,
            categoryName : reqBody.categoryName,
            keywordAmounts : [],
            createdAt : getTodayDate()
        });
    }

    await keywordModel.insertMany(keywordModels)
        .then((docs) => {
            console.log("Inserted!");
        })
        .catch((err) => {
            isSuccess = false;
        })


    return isSuccess;
}