const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const contactRoutes = require('./api/contact');

dotenv.config();

// --- App Setup ---
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- MongoDB Connection ---
mongoose.connect('mongodb://127.0.0.1:27017/contactFormDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- Routes ---
app.use('/contact', contactRoutes);

app.get('/', (req, res) => {
  res.json('Welcome to the Contact Form API');
});

// --- Start Server ---
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
