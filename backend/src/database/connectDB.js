
import mongoose from 'mongoose'
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        cnsole.log("successfully connected to mongodb");
    } catch (error) {
        console.log("failed to  to mongodb");
        console.log(process.env.MONGO_URI)
        process.exit(1);
        
    }
}

export default connectDB
