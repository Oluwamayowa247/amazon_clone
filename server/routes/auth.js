const express = require("express");

const authRouter = express.Router();

// authRouter.get('/user', (req, res)=>{
//     res.json({msg: "User Found"});
// });
authRouter.post("/api/signup", (req, res)=>{
    //get data from client
    //post data in database
    //return data to user

});


//expose file for public usage
//to export mulitple things objects or maps can be created
module.exports = authRouter;
