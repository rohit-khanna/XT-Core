const fs = require("fs");

let readSTrm = new fs.createReadStream("data.txt");

// readSTrm.on("data", function(val) {
//   console.log("REad Data with Chunk Size", val.length);
// });

readSTrm.on("open", function(val) {
  console.log("File open",val);
});

readSTrm.on("data", val => {
  console.log("REad Data with Chunk Size", val.length);
  readSTrm.pause();
  

  setTimeout(() => {
    
    readSTrm.resume();
  }, 1000);
});

readSTrm.on("error", function(err) {
  console.error(err);
});

readSTrm.on("end", function(val) {
  console.log("end reached");
});
