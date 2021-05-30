const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const HttpError=require('./models/Http-error')
const userrouter=require('./routers/user')
const contestrouter=require('./routers/Contest')
const questionrouter=require('./routers/question')
const submissionrouter=require('./routers/submissions')
const verificationroute=require('./routers/verification')
const registeredusersrouter=require('./routers/registerforcontest')
const Testvalidationrouter=require('./routers/Testvalidation')
const adminrouter=require('./routers/admin')
const Pendinguserrouter=require('./routers/Pendinguser')
const uploadfilecontroller=require('./routers/CsvUpload')
const imageuploadrouter=require('./routers/Image-upload')
const cors=require('cors')
require('dotenv').config()
const app = express();
const server = require("http").createServer(app);
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(cors())
//for trusting the headers attached by nginx
app.enable("trust proxy")
//body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//rest-routers
app.get("/",(req,res)=>{
  res.render('upload')
})
app.use(imageuploadrouter)
app.use(uploadfilecontroller)
app.use(Pendinguserrouter)
app.use(userrouter)
app.use(contestrouter)
app.use(questionrouter)
app.use(Testvalidationrouter)
app.use(verificationroute)
app.use(registeredusersrouter)
app.use(submissionrouter)
app.use(adminrouter)

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