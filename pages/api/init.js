import mongoose from "mongoose";


export default function init () {
    console.log("INIT START");
    mongoose.connect('mongodb://localhost:27017/testDB');
    const db = mongoose.connection;

    db.on("error", function(){
        console.log('Connection Failed!');
    });
    
    // 5. 연결 성공
    db.once("open", function() {
        console.log('Connected!');
    });
}