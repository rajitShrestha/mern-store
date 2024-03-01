"use strict";

// require('dotenv').config(); // Load environment variables from .env file

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var booksRoute = require('../routes/booksRoute.js');
var cors = require('cors');
var app = express();
var PORT = process.env.PORT || 5555;
var mongoDBURL = process.env.MONGODBURL;

// Middleware
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express["static"](path.join(__dirname, '..', 'frontend')));

// Define route for serving the frontend index.html file
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Routes
app.use('/books', booksRoute);

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('App connected to database');
  app.listen(PORT, function () {
    console.log("App is listening to port: ".concat(PORT));
  });
})["catch"](function (error) {
  console.log(error);
});