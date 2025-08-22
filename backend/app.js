const express = require('express');
const path = require('path');
const aboutRouter = require('./routes/about');

const app = express();

app.use('/api/about', aboutRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ... existing code ...

module.exports = app; 