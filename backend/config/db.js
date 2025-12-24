import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://vaidehi26:zerotwo02@cluster-1.gduafj5.mongodb.net/myDatabase?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {         
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
    