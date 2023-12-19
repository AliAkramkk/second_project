const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const authRouter = require('./routes/authRoute')

const app = express()
app.use(express.json());

const { DB_URL, PORT } = process.env;

// Connect to MongoDB
mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful database connection
    app.listen(PORT || 3000, () => {
      console.log(`Server connected at PORT: ${PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(authRouter)