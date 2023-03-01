const express = require("express");
const User = require("../models/user");
//bcrypt : allows for encryption of password
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

// authRouter.get('/user', (req, res)=>{
//     res.json({msg: "User Found"});
// });

//signup route
authRouter.post("/api/signup", async (req, res) => {
  try {
    //get data from client
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User with same email exists!!!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
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
    res.status(500).json({ error: e.message });
  }
  //post data in database

  //return data to user
});

//Sign In Route
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //Check if user exist
    if (!user) {
      //Status code 400 : Bad request
      return res
        .status(400)
        .json({ msg: "User with this email does not exist !!!" });
    }
    const matchedPassword = await bcryptjs.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ msg: "Incorrect password !!!" });
    }
    //to secure transfer login details on json fomat
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//expose file for public usage

//to export mulitple things objects or maps can be created
module.exports = authRouter;
