const express = require('express');
require('dotenv').config()
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const routes = require('./routes/index')

// SETTINGS
app.set('port', process.env.PORT || 3000);

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

// MIDDLEWARES
// gives the ability to pass json into a request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// ROUTES
app.use(routes)

// STATIC FILES


module.exports = app;