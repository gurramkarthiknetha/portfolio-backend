const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

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

// --- Mongoose Schema & Model ---
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// --- Routes ---
app.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessage = new Contact({ firstName, lastName, email, message });
    await newMessage.save();

    res.status(200).json({ success: true, message: 'Message received' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/', (req, res) => {
    res.json('Welcome to the Contact Form API');
    }
);
// --- Start Server ---
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
