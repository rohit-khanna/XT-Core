const express = require("express");
const ctrl = require("./OrderController");
const app = express();


app.use("/order", ctrl);



app.listen(4001, () => {
  console.log("server started at port 4001");
});
