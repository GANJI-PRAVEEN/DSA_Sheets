
import connectDB from './src/database/connectDB'
import app from './src/app.js'
import dotenv from 'dotenv'
dotenv.config();

const startServer = async() => {
    try {
        
        await connectDB();

        app.on("error",(error)=> {
            console.log("error",error);
            throw error
        });
        
        app.listen(process.env.PORT ||  8000,()=> {
            console.log("server running on port",process.env.PORT || 8000);
        })

        
    } catch (error) {
        console.log("failed to point to port");
    }
}


startServer();

