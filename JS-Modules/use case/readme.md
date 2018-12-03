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
    // Todo