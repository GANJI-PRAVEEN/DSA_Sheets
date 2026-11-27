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
            unique:true,
            sparse:true
        }
    },
    {
        timestamps:true
    }


);

export default  mongoose.model("Users",usersModel)


