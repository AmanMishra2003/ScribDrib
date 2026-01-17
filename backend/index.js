require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express(); //initializing app
const port  = 3000; //port name

app.use(cors({
origin:'http://localhost:5173',
credentials:true
})); //cross origin resourse sharing

app.use(express.json());  //parse JSON string to JS Object

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
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message || "Something went wrong",
  });
});

//listening to port 3000 (Backend Running)
app.listen(port,()=>{
    console.log("listening!!");
})