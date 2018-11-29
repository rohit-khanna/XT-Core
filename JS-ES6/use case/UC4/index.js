function getX() {
  // Data Structure for Cache
  // obj = {}; // ES 5
  objMap = new Map(); // ES 6

  return function(x) {
    // if (obj[x]) {  //ES 5
    if (objMap.get(x)) {
      console.log("Available in Cache");
    } else {
      //  obj[x] = x; // ES 5
      objMap.set(x, x);
      console.log("Adding");
    }
  };
}

let o =  getX();
o(3);
o(3);
o(1);
o(2);
o(4);
o(3);
o(4);
