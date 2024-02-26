"use strict";

var express = require('express');
var _require = require('../config.js'),
  PORT = _require.PORT,
  mongoDBURL = _require.mongoDBURL;
var mongoose = require('mongoose');
var booksRoute = require('../routes/booksRoute.js');
var cors = require('cors');
var app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', function (request, response) {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});
app.use('/books', booksRoute);
mongoose.connect(mongoDBURL).then(function () {
  console.log('App connected to database');
  app.listen(PORT, function () {
    console.log("App is listening to port: ".concat(PORT));
  });
})["catch"](function (error) {
  console.log(error);
});