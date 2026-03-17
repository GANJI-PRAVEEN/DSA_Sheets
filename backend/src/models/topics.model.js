import mongoose from "mongoose";

const topicsModel = new mongoose.Schema({
    topicId:String,
    topicName:String,
    position:Number,

    sheetId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sheet"
    }
});

export default mongoose.model("Topic",topicsModel);