//importing from packages
const express = require('express');
const mongoose = require("mongoose");

//import from other files
const authRouter = require("./routes/auth.js");


//init values
const PORT = 3000;
const app = express();
const DB = "mongodb+srv://Oluwamayowa:Oluwamayowa247@cluster0.g4gmujw.mongodb.net/?retryWrites=true&w=majority";

//Middleware (CLIENT MIDDLEWARE-> SERVER -> CLIENT)

//middleware
app.use(express.json());
app.use(authRouter);

//connections

mongoose.connect(DB).then(()=>{
    console.log('Connection Successful');

}).catch((e)=>{
    console.log(e);

});
//port 3000 = local host ad ip address "0.0.0.0" can be accessed anywhere
app.listen(PORT, "0.0.0.0", () =>{
    console.log(`connected at port ${PORT}`);

});