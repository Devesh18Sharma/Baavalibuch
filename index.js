const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(express.json());

// Log frontend connections
let connectionCount = 0;
app.get('/', (req, res) => {
  connectionCount++;
  res.send(`Connected ${connectionCount} times`);
});

// Receive text from frontend and send it to Django
app.post('/send-text', async (req, res) => {
  const { text } = req.body;

// Create a schema for logging connections
const logSchema = new mongoose.Schema({
    message: String,
  });
  
  // Create a schema for storing text entries
  const textSchema = new mongoose.Schema({
    text: String,
  });
  
  // Create models based on the schemas
  const LogEntry = mongoose.model('LogEntry', logSchema);
  const TextEntry = mongoose.model('TextEntry', textSchema);

  // Call Django API
  try {
    const response = await axios.get('http://localhost:8000/api/ngrams');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error contacting Django API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
