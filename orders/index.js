let express = require('express')
//import body parser
let bodyParser = require('body-parser');
//import mongoose
let mongoose = require('mongoose');
let app = express();

//Import routes
let orderRoutes = require("./order_routes")

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//connect to mongoose
// const dbPath = 'mongodb://127.0.0.1:27017/testdb';
const dbPath = 'mongodb+srv://chenfeng-1990:Test1234@cluster0.nzay2.mongodb.net/test'
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
});
var db=mongoose.connection;

//Check DB Connection
if (!db)
    console.log("Error connecting db");
else
    console.log("DB Connected Successfully");

// Server Port
var port = process.env.PORT || 8003;

//Use API routes in the App
app.use('/api', orderRoutes)

// Launch app to the specified port
app.listen(port, function() {
    console.log("Running order service on Port "+ port);
});
