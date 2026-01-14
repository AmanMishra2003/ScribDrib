require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express(); //initializing app
const port  = 3000; //port name

app.use(cors()); //cross origin resourse sharing

app.use(express.json());  //parse JSON object to JS Object

//Database connection
const mongodbPath = process.env.DATABASEURL 
mongoose.connect(mongodbPath).then(()=>{
    console.log("connection successfull!")
}).catch((err)=>{
    console.log(err)
})

//router imports
const HomeRouter = require('./Router/homeRouter');
const AuthRouter = require('./Router/authRouter');

app.use('/',HomeRouter);
app.use('/auth',AuthRouter);


//error handler
app.use((err,req,res,next)=>{
    res.send(err).status(400)
})

//listening to port 3000 (Backend Running)
app.listen(port,()=>{
    console.log("listening!!");
})