# microservice-restapi-nodejs-express-online-order-process
A simple microservice online order process demo, which created by node.js and express.js.



## Main Features ##
* Key word:
    * Microservices, REST-api, Node.js, Express.js, JavaScript, MongoDB, mLab. 
    
* This system using a cloud mongoDB mLab to store all the data.
    
* This system contains 4 services (user service, item service, order service and bill service), it follows the microService architecture.

* These services communicate with each other asynchronously (promise, axios).

* A REST interface is available to the user (see the api endpoints).

* The system represent a simple ordering process. 

* It is able to initiate an order via PUT order method.

* It is able to retrieve a list of items with their quantity via GET all items method.

* When an order gets triggered, a delivery bill will be created, and an email contains the billPDF will be sent to the user (In this step, when an order at the frontend-side is confirmed and submitted to the service, the order json file will be sent to the order service api via the 
endpoint "http://localhost:8003/api/order", besides, the order json file will be sent to the bill service api via the endpoint 
"http://localhost:8004/api/bill", then on the bill service, based on the user_id and an array with one or more item_id, then fetch the user's 
  data via the endpoint on the user service, and fetch the items via the endpoint on the item service, then using map and filter methods
   to get more details information from the user and the items, then storing it into the bill database, and pdfkit is implemented 
   at this step, a bill PDF file will be generated and
   stored in the file system, apart from that, nodemailer is implemented at this step to send an email to the user).

* An order can consist of several articles (stored items as an array, each item contains the item id, ordered quantity), and it contains a user id.

* When a delivery bill has been created, the number of articles still available is to be reduced (inside of the Bill service, 
if a bill created, items quantity number(the ordered items) will be accounted, PATCH method will be used to call the api endpoint on item service, in order to update the ordered items' quantity number   ).

* If an article is no longer available, it must not be ordered (if user order an item with a certain quantity, if this number is bigger than  
the quantity number of the selected item, or if the isAvailable field of the item is false, after submit the order, the order service will reject the request).

* It is able to retrieve an already existing delivery bill metadata and the bill PDF file (see the api endpoints).


## Examples ##

* Inside the examples folder, it contains multi screenshots pictures, and a bill PDF file.






## User service ##

### `npm install`

### `npm start` or `npm dev`

#### API endpoints ####
* Get all users:
    * Method: GET,  http://localhost:8001/api/users
* Get user by id:
    * Method: GET,  http://localhost:8001/api/user/:id
* Create a user:
    * Method: POST,  http://localhost:8001/api/user
* Delete a user:
    * Method: DELETE,  http://localhost:8001/api/user/:id
    
    



## Item service ##

### `npm install`

### `npm start` or `npm dev`

#### API endpoints ####
* Get all items:
    * Method: GET,  http://localhost:8002/api/items
* Get item by id:
    * Method: GET,  http://localhost:8002/api/item/:id
* Update item by id:
    * Method: Patch,  http://localhost:8002/api/item/:id
* Create an item:
    * Method: POST,  http://localhost:8002/api/item
* Delete an item:
    * Method: DELETE,  http://localhost:8002/api/item/:id
    
    
    
    
    

## Order service ##

### `npm install`

### `npm start` or `npm dev`

#### API endpoints ####

* Get all orders:
    * Method: GET,  http://localhost:8003/api/orders
* Get an order by id:
    * Method: GET,  http://localhost:8003/api/order/:id
* Update an order by id:
    * Method: PUT,  http://localhost:8003/api/order/:id
* Create an order:
    * Method: POST,  http://localhost:8003/api/order
* Delete an order:
    * Method: DELETE,  http://localhost:8003/api/order/:id
    
    
 
 
    
## Bill service ##

### `npm install`

### `npm start` or `npm dev`

#### API endpoints ####

* Get a bill by id:
    * Method: GET,  http://localhost:8004/api/bill/:id
* Create a bill:
    * Method: POST,  http://localhost:8004/api/bill
* Get a bill PDF file:
    * Method:  GET,  http://localhost:8004/api/bill/pdf/:id


