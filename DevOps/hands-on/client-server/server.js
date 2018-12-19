const http = require("http");

const obj = {
  id: 766,
  name: "Rohit"
};

let server = new http.createServer(function(req, res) {
  // let buf=Buffer.from(JSON.stringify(obj));

  res.setHeader("content-type", "text/JSON");
  res.write(obj);
  res.end();
});
server.listen(3002, () => console.log("server ready"));
