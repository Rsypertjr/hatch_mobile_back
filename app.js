const express = require('express');
const logger = require('morgan');
const path = require('path');
const fs = require('fs')
const morgan = require('morgan')
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console
//app.use(logger('dev'));
let logStream = fs.createWriteStream(path.join(__dirname, "logfile.log"), {flags: "a"});
app.use(morgan("combined", { stream: logStream }));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const cors = require("cors");
app.use(cors());


require('./server/routes')(app);

//Setup a default catch-all route that sends back a welcome message
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness',

}));

module.exports = app;