const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  journal: {
    type: String,
    required: true,
    trim: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  doi: {
    type: String,
    required: true,
    unique: true
  },
  abstract: {
    type: String,
    required: true
  },
  keywords: [{
    type: String,
    trim: true
  }],
  pdfUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication; 