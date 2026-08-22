import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI is not defined in environment variables.');
            return;
        }

        mongoose.connection.on('connected', () => console.log('Database connected'));

        const uri = process.env.MONGODB_URI.endsWith('/')
            ? `${process.env.MONGODB_URI}Quickshow`
            : process.env.MONGODB_URI.includes('Quickshow')
                ? process.env.MONGODB_URI
                : `${process.env.MONGODB_URI}/Quickshow`;

        await mongoose.connect(uri);
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
    }
};

export default connectDB;