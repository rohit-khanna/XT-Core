const express = require("express");
const ctrl = require("./OrderController");
const app = express();
app.use("/order", ctrl);
app.use('/',middleware);





app.listen(4001, () => {
  console.log("server started at port 4001");
});


function middleware(req,res,next){
res.end('Welcome to Home page. Use "/order" path');

}
