# Use Cases Details

### 1. UC1->API: using Modules
Build ProfileService App using JS MOdule Pattern:
#### A. using COMMON JS Module
 - We use Browserify to generate the 'bundle.js' and then refer it into index.html.
 Everytime we make any code changes this bundle.js needs to be regenerated.
 Command:
 `
  browserify profileController.js -o bundle.js 
 `
#### B. Using ES6 Module Pattern
 - We use 'Webpack' as bundler to generate a 'my-first-webpack.bundle.js' file in '/dist' directory and then refer it into index.html.Everytime we make any code changes this bundle.js needs to be regenerated.
 Command
 `
  webpack
 `
 or if you want to use the watch mode, use:
 `
  webpack --watch
 `