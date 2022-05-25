import mongoose from "mongoose";

export default function init () {
    mongoose.connect('mongodb://13.125.244.255:27017/trend-analysis');
    const db = mongoose.connection;

    db.on("error", function(){
        console.log('Connection Failed!');
    });
    
    db.once("open", function() {
        console.log('Connected!');
    });
}