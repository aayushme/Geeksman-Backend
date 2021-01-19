const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const userrouter=require('./routers/user')
const contestrouter=require('./routers/Contest')
const questionrouter=require('./routers/question')
const submissionrouter=require('./routers/submissions')
const adminrouter=require('./routers/admin')
const registeredusersrouter=require('./routers/registerforcontest')
require('dotenv').config()
const app = express();

const server = require("http").createServer(app);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
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

 mongoose
  .connect(
    `${process.env.DATABASE_URL}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  ).then(()=>{
    server.listen(5000, () => {
      console.log("server is running on port", 5000);
    });
  
  }).catch((err)=>{
    console.log(err)
  })
  