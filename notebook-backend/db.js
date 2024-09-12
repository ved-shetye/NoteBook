const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectMongo = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Mongo connected successfully.`);
    } catch (error) {
        console.log(`Mongo not connected:${error}`);
    }
}

module.exports = connectMongo;