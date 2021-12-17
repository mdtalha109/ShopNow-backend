import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn= await mongoose.connect('mongodb+srv://Talha1234:Talhashopnow@shopnow.3d2z8.mongodb.net/shopnow?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;