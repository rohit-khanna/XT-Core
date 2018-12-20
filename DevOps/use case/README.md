# Use Cases Details

### 1. UC1->IO Module
Store list of customers and their orders into JSON file. (Follow Modular Approach with Service/DAL/UiController)
Req:
 A. Store All Customers and their orders
 B. List the Customer reports.

 #### Run 
 `npm start`


 ### 2. UC1-> Express API
Create REST API for following resource : Profile
Req:
 - Mock Profile data as Array [id, name,city]
 - CRUD
  /api/profiles   => List All profiles
  /api/profiles/1 => Get PRofile for ID:1
  /api/profiles   => CREATE New
  /api/profiles/id => Get PRofile for with city
  /api/profiles/id => Remove Profile


Also Handle Error and send Messages to Client


 #### Run 
 1. Run Mock Server
 Go To /mock-server and run
 `npm start`

 1. Run Express Server
 Go To / and run
 `npm start`
