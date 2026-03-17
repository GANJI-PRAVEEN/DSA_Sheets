import mongoose from "mongoose";


const problemsModel = new mongoose.Schema({
    problemId:String,
    problemName:String,
    difficulty:String,
    links:{
        lc_link:{
            type:String,
            default:null
        },
        gfg_link:{
            type:String,
            default:null
        },
        coding_ninjas_link:{
            type:String,
            default:null
        },
    },
    topicId:String,
    sheetId:{
        type:new mongoose.Schema.Types.ObjectId,
        ref:"Sheet"
    }
});

export default mongoose.model("Problem",problemsModel);