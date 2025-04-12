const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- Mongoose Schema & Model ---
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// --- Contact Routes ---
router.post('/', async (req, res) => {
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

module.exports = router;