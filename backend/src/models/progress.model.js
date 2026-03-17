import mongoose, { Schema } from "mongoose";


const progressModel = new Schema({
    topicId:{
        type:String,
        required:true
    },

    userId:{
        type:String,
        required:true
    },
    problemId:{
        type:String,
        required:true
    },
    sheetId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sheet"
    },

    status:{
        type:String,
        enum:['solved','unsolved'],
        default:'unsolved'
    }
});


export default mongoose.model("Progress",progressModel);