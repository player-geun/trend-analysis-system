// 카테고리 저장 api
import dbInit from "./dbInit.js";
import keywordModel from "./models/Keyword.js";

dbInit();

export default async function handler(req, res) {
    const apiMethod = req.method;
    const reqBody = req.body;
    const category = req.body.categoryName
    const categoryModels = await findCategory(category);
    //카테 고리 중복 방지
    if(categoryModels.length != 0){
        res.status(200).json({ 
           isSuccess : false,
           code: 3001,
           message: "이미 등록된 카테고리 입니다."
       })
    }
    
    else if (apiMethod == "POST" && categoryModels.length == 0 ) {
        const isSuccess = await saveKeywords(reqBody);


        if(isSuccess && categoryModels.length == 0) {
            res.status(200).json({ 
                    isSuccess : true,
                    code: 1000,
                    message: "카테고리 등록에 성공하셨습니다."
            })
        }
        else {
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

const findCategory = async(category) => {
    const data = await keywordModel.find({categoryName : category});
    return data;
}