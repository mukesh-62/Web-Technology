const express = require('express');
const Hostel = require('../models/hostel');
const router = express.Router();

router.get('/', async (req, res) => {
  const hostels = await Hostel.find();
  res.json(hostels);
});

router.post('/', async (req, res) => {
  const newHostel = new Hostel(req.body);
  await newHostel.save();
  res.json(newHostel);
});

router.put('/:id', async (req, res) => {
  const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedHostel);
});

router.delete('/:id', async (req, res) => {
  await Hostel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Hostel deleted' });
});

module.exports = router;
