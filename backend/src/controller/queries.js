import usersModel from "../models/users.model";


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
        return res.statsu(200).json({
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