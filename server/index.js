//Creating an api
const express = require('express');
const PORT = 3000;

//initialize express
const app = express();
//Create API

app.listen(PORT, () =>{
    console.log(`connected at port ${PORT}`);

});