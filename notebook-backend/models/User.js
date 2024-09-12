const mongoose = require("mongoose");

//User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  }
})

const User = mongoose.model("user",userSchema);
module.exports = User;
