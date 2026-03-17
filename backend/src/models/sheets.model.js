import mongoose from "mongoose";


const sheetModel = new mongoose.Schema({
    sheetName:String,
    author:String,
    sheetDesc:String,
    totalQuestions:Number

})

export default mongoose.model("Sheet",sheetModel);