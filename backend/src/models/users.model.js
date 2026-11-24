import mongoose, { Schema } from "mongoose";


const usersModel = new Schema(
    {
        Name:{
            type:String,
            required:true,
            trim:true
        },
        Email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
        },
        Password:{
            type:String,
            default:null,
        },
        GoogleId:{
            type:String,
            sparse:true,
            unique:true,
            default:null
        }

    },
    {
        timestamps:true
    }


);

export default  mongoose.model("Users",usersModel)


