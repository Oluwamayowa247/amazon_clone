const express = require("express");
const User = require("../models/user");
//bcrypt : alllows for encryption of password
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();

// authRouter.get('/user', (req, res)=>{
//     res.json({msg: "User Found"});
// });
authRouter.post("/api/signup", async (req, res) => {
  try {
    //get data from client
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "user with same email exists!!!" });
    }

   const hashedPassword = await bcryptjs.hash(password,8 );
    //let keyword allows for scope variable declaration
    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();
    //json format of response
    res.json(user);
  } catch (e) {
    //status code 500 : Internal Server error
    res.status(500).json({error: e.message});
  }
  //post data in database

  //return data to user
});

//expose file for public usage
//to export mulitple things objects or maps can be created
module.exports = authRouter;
