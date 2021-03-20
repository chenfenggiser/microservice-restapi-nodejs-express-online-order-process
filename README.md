# microservice-restapi-nodejs-express-online-order-process
A simple microservice online order process demo, which created by node.js and express.js.





## Main Features ##
* Key word:
    * Microservices, REST-api, Node.js, Express.js, JavaScript, MongoDB, mLab. 
    
* This system contains 4 services (user service, item service, order service and bill service), it based on the microService architecture.

* These services communicate with each other asynchronously (promise, axios).

* A REST interface is available to the user (see the api endpoints).

* The system represent a simple ordering process. 

* It is able to initiate an order via PUT order method.

* It is able to retrieve a list of items with their quantity via GET all items method.

* When an order gets triggered, a delivery bill will be created, and an email contains the billPDF will be sent to the user by e-mail.

* An order can consist of several articles (stored items as an array, each item contains the item id, ordered quantity), and it contains a user id.

* When a delivery bill has been created, the number of articles still available is to be reduced (inside of the Bill service, 
if a bill created, items quantity number(the ordered items) will be accounted, PATCH method will be used to call the bill service api, in order to update the ordered items' quantity number   ).

* If an article is no longer available, it must not be ordered (if user order an item with a certain quantity, if this number is bigger than  
the quantity number of the selected item, or if the isAvailable field of the item is false, after submit the order, the order service will reject request).

* It is able to retrieve an already existing delivery bill metadata and the bill PDF file (see the api endpoints).


## Examples ##

* Inside the examples folder, it contains multi screenshots pictures, and a bill PDF file.



## API endpoints ##


### User service ###
* Get all users:
    * Method: GET,  http://localhost:8001/api/users
* Get user by id:
    * Method: GET,  http://localhost:8001/api/user/:id
* Create a user:
    * Method: POST,  http://localhost:8001/api/user/:id
* Delete a user:
    * Method: DELETE,  http://localhost:8001/api/user/:id
    
    
### Item service ###
* Get all items:
    * Method: GET,  http://localhost:8002/api/items
* Get item by id:
    * Method: GET,  http://localhost:8002/api/item/:id
* Create an item:
    * Method: POST,  http://localhost:8002/api/item/:id
* Delete an item:
    * Method: DELETE,  http://localhost:8002/api/item/:id
    
    
### Order service ###
* Get all orders:
    * Method: GET,  http://localhost:8003/api/orders
* Get order by id:
    * Method: GET,  http://localhost:8003/api/order/:id
* Create an order:
    * Method: POST,  http://localhost:8003/api/order/:id
* Delete an order:
    * Method: DELETE,  http://localhost:8003/api/order/:id
    
    
### Bill service ###
* Get a bill by id:
    * Method: GET,  http://localhost:8004/api/bill/:id
* Create a bill:
    * Method: POST,  http://localhost:8004/api/bill/:id
* Get a bill PDF file:
    * Method:  GET,  http://localhost:8004/api/bill/pdf/:id


