const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/feedback/submit", (req, res) => {
    const { name, unit, feedback } = req.body;
    console.log(name, unit, feedback); // Log the feedback data to confirm it's coming correctly
    // Here you can handle saving the feedback to the database
    res.json({ message: "Feedback submitted successfully!" });
  });
  
  let inventory = [
    { id: 1, unit: "Unit A", item: "Item 1", stock: 10, reorderLevel: 5, salesTrend: [10, 20, 15] },
    // Add more items here
  ];
  
  // Route to get inventory
  app.get("/api/inventory", (req, res) => {
    res.json(inventory); // Return the inventory data as a JSON response
  });
  
  // Route to add new inventory
  app.post("/api/inventory", (req, res) => {
    const newItem = req.body;
    newItem.id = inventory.length + 1; // Assign a new ID
    inventory.push(newItem);
    res.status(201).json(newItem); // Return the new item added
  });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
