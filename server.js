const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const userrouter=require('./routers/user')
const contestrouter=require('./routers/Contest')
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
  });

app.use('/geeksman',userrouter)
app.use('/geeksman',contestrouter)
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
    `mongodb+srv://Geeksmanofficial:rckpXtOjrj2BEOhw@cluster0.pe0ga.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("server is running on port", 5000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
