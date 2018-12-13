# Shopping Cart

## Core Functionality 

create dynamic Shopping Bag module for an Ecommerce web application.	On first load Shopping bag should have some items. 


** Notes: ES6 syntax have been used and `.babelrc` file contains the config for babel-loader.

### User Interface

![UI for Shopping Cart]()

#### Contents
- **backend/model/CartProduct.js** : This is the Model for Cart Product
- **backend/model/Product.js** : This is the Model for  Product (Product in DB)
- **backend/model/ShoppingCart.js** : This is the Model for ShoppingCart
- **backend/services/FetchDAL.js** : This is the DAL implementation using [node-fetch](https://www.npmjs.com/package/node-fetch)
- **backend/services/ProductService.js** : This is the Service for Product(DB) which uses a DAL to interact with DB. 
- **backend/services/ShoppingCartService.js** : This is the Service for Shopping Cart. UI should interact with this service.


#### Test Cases
[Jasmine-JS](https://jasmine.github.io/) has been used for BDD. Test cases can be found at: [spec/backend](/spec/backend)

1.  `npm install`
2.  `babel-node spec/run.test.js` or `npm run test`

#### Steps to Run
1. Run the **Mock Server** : [Can be Taken out and Deployed Separately]   
    - use command line to navigate : [\backend\services\mock-db-server](\backend\services\mock-db-server)
    - make sure `db.json`  is present
    - run `npm start`
    - now Db Server will be available at endpoint: http://localhost:3000/products



##### References
- https://fullstack-developer.academy/using-jasmine-with-javascript-es2015/
