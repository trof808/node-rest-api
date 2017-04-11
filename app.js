'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./db/db');
const config = require('./config');
const path = require('path');

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'jade');
app.use(express.static('public'));

//set up sessions
app.use(cookieParser(config.cookieSecret));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret
}));

//logger
if (app.get('env') === 'development') {
    app.use(require('morgan')('dev'));
} else if ((app.get('env') === 'production')) {
    app.use(require('express-logger')({
        path: __dirname + '/log/request.log'
    }));
}

app.use('/users', require('./routes/routes'));

//error handling middleware
app.use((err, req ,res, next) => {
    // res.status(err.status);
    res.send({error: err.message});
    console.log(err.message);
});

module.exports = app;
