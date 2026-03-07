import usersModel from "../models/users.model.js";

export const welcome = async(req,res) => {
    try {
        return res.status(200).json({
            success:true,
            message:"Welcome to DSA Sheets API"
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error",
            error
        });
    }
}

export const createUser = async(req,res) => {
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Pls provide all data",
                success:false
            })
        }

        const user = await usersModel.create({
            Name:name,
            Email:email,
            Password:password
        });
        return res.status(200).json({
            success:true,
            message:"Successfully created the user"
        })

    } catch (error) {
        console.log("failed to create the user",error);
        return res.status(400).json({
            success:false,
            message:"failed",
            error
        })
        
    }
}