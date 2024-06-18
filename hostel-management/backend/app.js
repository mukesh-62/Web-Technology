const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const hostelRoutes = require('./routes/hostelRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/hostelManagement', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/api/hostels', hostelRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
