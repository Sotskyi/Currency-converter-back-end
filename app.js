const express = require("express");
const app = express();
const connectDB = require('./config/db');
const cron =require('./cron.js')
const path=require('path')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use( express.json());
const currencyValue = require('./routes/currencyValue')
 app.use("/api",currencyValue);
 
 app.use("/",express.static(path.join(__dirname,"client","build")));
 require('dotenv').config({path:'./config/config.env'})
 connectDB()

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))



  })
cron.job.start();
 app.listen(5000,()=>console.log("aapp has been started"))

 

 




