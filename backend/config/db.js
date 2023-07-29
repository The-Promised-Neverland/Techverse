import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    // connection call to mongoDB
    try { 
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.yellow.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold); // these red yellow cyan etc are just from colors.js not really required, just colors the terminal
        process.exit(1);
    }
};

export default connectDB;
