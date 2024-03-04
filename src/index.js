require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const booksRoute = require('../routes/booksRoute.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODBURL;

// Middleware
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Define route for serving the frontend index.html file
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Routes
app.use('/books', booksRoute);

// Connect to MongoDB
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
