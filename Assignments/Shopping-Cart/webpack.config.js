const path = require("path");

module.exports = {
  entry: "./UI/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js"
  },
  devtool: "source-map"
};
