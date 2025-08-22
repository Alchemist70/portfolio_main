const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  values: { type: String, required: true },
  skills: { type: [String], default: [] },
  photoUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema); 