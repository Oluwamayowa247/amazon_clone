const express = require("express");
const User = require("../models/user");

const authRouter = express.Router();

// authRouter.get('/user', (req, res)=>{
//     res.json({msg: "User Found"});
// });
authRouter.post("/api/signup", async (req, res)=>{
    //get data from client
    const {name, email, passwprd} = req.body;

 const existingUser=  await User.findOne({ email });

  if(existingUser){
    return res.json({msg: "user with same email exists!!!"});
    
  }
    //post data in database
    
    //return data to user

});


//expose file for public usage
//to export mulitple things objects or maps can be created
module.exports = authRouter;
