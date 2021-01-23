const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const HttpError=require('./models/Http-error')
const userrouter=require('./routers/user')
const contestrouter=require('./routers/Contest')
const questionrouter=require('./routers/question')
const submissionrouter=require('./routers/submissions')
const adminrouter=require('./routers/admin')
const verificationroute=require('./routers/verification')
const registeredusersrouter=require('./routers/registerforcontest')
const cors=require('cors')
require('dotenv').config()
const app = express();
const server = require("http").createServer(app);
app.set('view engine', 'ejs');
app.use(cors())
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//admin router
app.use('/admin',adminrouter)
//body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//rest-routers

app.use(userrouter)
app.use(contestrouter)
app.use(questionrouter)
app.use(verificationroute)
app.use(registeredusersrouter)
app.use(submissionrouter)
app.use((req, res, next) => {
    throw new HttpError("Could not find this route", 404);
  });
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res
      .status(error.code || 500)
      .json({ message: error.message || "An unknown error occured" });
  });

 const port=process.env.PORT||5000
 mongoose
  .connect(
    `${process.env.DATABASE_URL}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  ).then(()=>{
    server.listen(port, () => {
      console.log("server is running on port",port);
    });
  
  }).catch((err)=>{
    console.log(err)
  })
  