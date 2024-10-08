require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB Cluster
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB cluster successfully!');

    // Test connection to specific databases
    testDatabaseConnections();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB cluster:', err.message);
  });

// Function to test connection to different databases
async function testDatabaseConnections() {
  const databases = ['Content-List', 'User-List'];  

  for (let dbName of databases) {
    try {
      const db = mongoose.connection.useDb(dbName);
      console.log(`Connected to ${dbName} successfully!`);
    } catch (err) {
      console.error(`Error connecting to ${dbName}:`, err.message);
    }
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
