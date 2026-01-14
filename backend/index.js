require('dotenv').config()
const express = require('express');
const cors = require('cors');


const app = express(); //initializing app
const port  = 3000; //port name

app.use(cors()); //cross origin resourse sharing

app.use(express.json());  //parse JSON object to JS Object

//error handler
app.use((err,req,res,next)=>{
    res.send(err).status(400)
})

//listening to port 3000 (Backend Running)
app.listen(port,()=>{
    console.log("listening!!");
})