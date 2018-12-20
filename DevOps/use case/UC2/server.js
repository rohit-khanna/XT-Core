const express = require("express");
const profileRouter = require("./profileController");
const parser = require("body-parser");
const app = express();

app.use(parser.json());
app.use("/api/profiles", profileRouter);
app.use("", welcomeMiddleWare);

function welcomeMiddleWare(req, res, next) {
  res.end('Welcome to Home Page. Use "/api/profiles" for further interaction');
}


app.listen('3002',()=>{console.log('server started at port 3002')})
