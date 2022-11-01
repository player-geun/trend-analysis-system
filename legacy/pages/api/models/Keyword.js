import mongoose from "mongoose";

const KeywordSchema = mongoose.Schema({
    keywordName : {
        type: String
    },
    categoryName : {
        type : String
    },
    keywordAmounts : {
        type: Array
    },
    createdAt : {
        type: String
    }
});

mongoose.models = {};
const model = mongoose.model('Keyword', KeywordSchema);

export default model;