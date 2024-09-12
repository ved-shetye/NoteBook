const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const {body,validationResult} = require("express-validator");
const fetchUserData = require("../middleware/fetchUserData");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//Route for creating user
router.post("/createUser",[
    body("name","Name must be atleast 5 characters").isLength({min:5}),
    body("email","Enter a valid email").isEmail(),
    body("password","Password must be atleast 5 characters").isLength({min:5}),
],
async (req,res)=>{
 //if there are errors return bad request
 const errors = validationResult(req);
 let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //Check whether the email already exists
    try {
        let user = await User.findOne({email:req.body.email}); 
        if (user) {
            res.status(400).json({success,error:"Sorry a user with this email already exists"})
        }
        //Creates salt to be added to our hashed password
        const salt = await bcryptjs.genSalt(10);
        const secPass = await bcryptjs.hash(req.body.password,salt);
        let currentDate = new Date();
        currentDate = currentDate.toLocaleDateString();
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
            date:currentDate
        });
        //data is filled with user details via id for assigning a authentication token
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route for loging in the user
router.post("/login",[
    body("email","Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists()
],async (req,res)=>{
 //if there are errors return bad request and the errors
 const errors = validationResult(req);
 let success = false;
 if (!errors.isEmpty()) {
   return res.status(400).json({ success,errors: errors.array() });
 }
const {email,password} = req.body;
//To see if there is a account with the given email.If yes compare the passwords
try {
 let user = await User.findOne({email});
 if (!user) {
   return res.status(400).json({success,error:"Please try to login with correct credentials"});
 }
 const passwordCompare = await bcryptjs.compare(password,user.password);
 if (!passwordCompare) {
   return res.status(400).json({success,error:"Please try to login with correct credentials"});
 } 
 //data for auth-token
 const data = {
   user:{
     id:user.id
   }
 }
 const authToken = jwt.sign(data,JWT_SECRET);
 success = true;
 res.json({success,authToken});

} catch (error) {
 console.log(error.message);
   res.status(500).send("Internal Server Error");
}
});

//Route for getting user data
router.get("/getUserData",fetchUserData,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.log(error.message);
            res.status(500).send("Internal Server Error");
      }
});

module.exports = router;