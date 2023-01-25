//importing from packages
const express = require('express');
const mongoose = require("mongoose");

//import from other files
const authRouter = require("./routes/auth.js");


//init values
const PORT = 3000;
const app = express();

//Middleware (CLIENT MIDDLEWARE-> SERVER -> CLIENT)

//middleware
app.use(authRouter);

//connections

mongoose.connect().then(()=>{
    console.log('Connection Successful');

}).catch((e)=>{
    console.log(e);

});

app.listen(PORT, () =>{
    console.log(`connected at port ${PORT}`);

});