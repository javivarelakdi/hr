//index.js
//Import Express
let express = require('express')
//Start App
let app = express();
//Import routes
//const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
// const eventsRouter = require("./routes/events");
// const chatsRouter = require("./routes/chats");
//import body parser
let bodyParser = require('body-parser');
//import mongoose
let mongoose = require('mongoose');
//Assign port
let port = process.env.PORT || 8080;

//configure bodyparser to handle the post requests
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//Use API routes in the App
//app.use("/", authRouter);
app.use("/users", usersRouter);
// app.use("/events", eventsRouter);
// app.use("/chats", chatsRouter);
// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})


//connect to mongoose
const dbPath = 'mongodb://localhost/firstrest';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})
