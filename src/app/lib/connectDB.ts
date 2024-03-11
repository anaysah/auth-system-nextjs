import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  try {
    const conn = await mongoose.connect(DATABASE_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB is connected");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error", err);
    });

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;