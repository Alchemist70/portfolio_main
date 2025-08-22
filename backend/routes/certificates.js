const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const { certificateValidation } = require('../middleware/validator');
const { getPagination, getPagingData, createSearchQuery } = require('../utils/queryHelpers');

// Get all certificates with pagination and search
router.get('/', apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10, search, featured } = req.query;
    const { limit, skip } = getPagination(page, size);
    const searchQuery = createSearchQuery(search, ['title', 'issuer', 'description']);
    if (featured !== undefined) {
      searchQuery.featured = featured === 'true';
    }
    const [certificates, total] = await Promise.all([
      Certificate.find(searchQuery)
        .sort({ issueDate: -1 })
        .limit(limit)
        .skip(skip),
      Certificate.countDocuments(searchQuery)
    ]);
    res.json(getPagingData({ count: total, rows: certificates }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get certificates by skill
router.get('/skill/:skill', apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const { limit, skip } = getPagination(page, size);
    
    const [certificates, total] = await Promise.all([
      Certificate.find({
        skills: { $regex: req.params.skill, $options: 'i' }
      })
        .sort({ date: -1 })
        .limit(limit)
        .skip(skip),
      Certificate.countDocuments({
        skills: { $regex: req.params.skill, $options: 'i' }
      })
    ]);

    res.json(getPagingData({ count: total, rows: certificates }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single certificate
router.get('/:id', apiLimiter, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create certificate (protected route)
router.post('/', [auth, apiLimiter, certificateValidation], async (req, res) => {
  const certificate = new Certificate({
    title: req.body.title,
    issuer: req.body.issuer,
    issueDate: req.body.issueDate,
    expiryDate: req.body.expiryDate || undefined,
    credentialUrl: req.body.credentialUrl,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    skills: req.body.skills || [],
    featured: req.body.featured || false
  });
  try {
    const newCertificate = await certificate.save();
    res.status(201).json(newCertificate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update certificate (protected route)
router.patch('/:id', [auth, apiLimiter, certificateValidation], async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    Object.keys(req.body).forEach(key => {
      certificate[key] = req.body[key];
    });
    const updatedCertificate = await certificate.save();
    res.json(updatedCertificate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete certificate (protected route)
router.delete('/:id', [auth, apiLimiter], async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json({ message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 