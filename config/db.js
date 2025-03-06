const mongoose = require("mongoose");
const dotenv= require("dotenv");
dotenv.config(); 
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI,{
     
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
console.log("git");
module.exports = connectDB;
