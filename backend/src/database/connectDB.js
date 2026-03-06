import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MONGO_URI:', process.env.MONGO_URI);
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✓ Successfully connected to MongoDB');
    } catch (error) {
        console.error('✗ Failed to connect to MongoDB:', error.message);
        console.error('MONGO_URI:', process.env.MONGO_URI);
        process.exit(1);
    }
};

export default connectDB;