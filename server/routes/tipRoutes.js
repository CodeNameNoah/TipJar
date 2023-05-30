const express = require('express');
const Tip = require('../models/Tip');

const router = express.Router();

// Get all tips
router.get('/', async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (error) {
    console.error('Error getting tips:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new tip
router.post('/', async (req, res) => {
  try {
    const { recipient, amount } = req.body;
    const tip = new Tip({ recipient, amount });
    await tip.save();
    res.status(201).json(tip);
  } catch (error) {
    console.error('Error creating tip:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a tip
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipient, amount } = req.body;
    const tip = await Tip.findByIdAndUpdate(id, { recipient, amount }, { new: true });
    res.json(tip);
  } catch (error) {
    console.error('Error updating tip:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a tip
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Tip.findByIdAndRemove(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting tip:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
