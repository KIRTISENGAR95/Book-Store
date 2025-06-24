const express = require("express");        // import express js framework
const app=express();                       // initilize express app

const conn = require("./connection/conn");             // connect mongodb
const PORT = process.env.PORT || 3000;                 // set server port
conn();                                              // call the function



app.listen(PORT, () => {                             //
    console.log(`server started at port ${PORT}`);
});