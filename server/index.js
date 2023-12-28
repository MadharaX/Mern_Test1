// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
//# - %23
//19267Mad$%25%23
//mongodb+srv://MongoDB_C0:19267Mad$%25%23@cluster0.iuguyuf.mongodb.net/
// const password = encodeURIComponent("19267Mad$%25%23");
const mongoURI = `mongodb+srv://MongoDB_C0:19267Mad$%25%23@cluster0.iuguyuf.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mobile phone schema
const mobilePhoneSchema = new mongoose.Schema({
  phoneModel: String,
  brand: String,
  price: Number,
  color: String,
  description: String,
});
 
// Create a mobile phone model
const MobilePhone = mongoose.model('MobilePhone', mobilePhoneSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// CRUD operations

// Create a new mobile phone
app.post('/phones', async (req, res) => {
  try {
    const newPhone = await MobilePhone.create(req.body);
    res.status(201).json(newPhone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all mobile phones
app.get('/phones', async (req, res) => {
  try {
    const phones = await MobilePhone.find();
    res.json(phones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific mobile phone by ID
app.get('/phones/:id', async (req, res) => {
  try {
    const phone = await MobilePhone.findById(req.params.id);
    res.json(phone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a mobile phone by ID
app.put('/phones/:id', async (req, res) => {
  try {
    const updatedPhone = await MobilePhone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPhone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a mobile phone by ID
app.delete('/phones/:id', async (req, res) => {
  try {
    await MobilePhone.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mobile phone deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
