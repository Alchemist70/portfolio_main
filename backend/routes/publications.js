const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const { publicationValidation } = require('../middleware/validator');
const { getPagination, getPagingData, createSearchQuery } = require('../utils/queryHelpers');

// Get all publications with pagination and search
router.get('/', apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10, search, featured } = req.query;
    const { limit, skip } = getPagination(page, size);
    const searchQuery = createSearchQuery(search, ['title', 'journal', 'abstract', 'keywords']);
    if (featured !== undefined) {
      searchQuery.featured = featured === 'true';
    }
    const [publications, total] = await Promise.all([
      Publication.find(searchQuery)
        .sort({ publicationDate: -1 })
        .limit(limit)
        .skip(skip),
      Publication.countDocuments(searchQuery)
    ]);
    res.json(getPagingData({ count: total, rows: publications }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured publications
router.get('/featured', apiLimiter, async (req, res) => {
  try {
    const publications = await Publication.find({ featured: true }).sort({ publicationDate: -1 });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get publications by tag
router.get('/tag/:tag', apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const { limit, skip } = getPagination(page, size);
    
    const [publications, total] = await Promise.all([
      Publication.find({
        keywords: { $regex: req.params.tag, $options: 'i' }
      })
        .sort({ publicationDate: -1 })
        .limit(limit)
        .skip(skip),
      Publication.countDocuments({
        keywords: { $regex: req.params.tag, $options: 'i' }
      })
    ]);

    res.json(getPagingData({ count: total, rows: publications }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single publication
router.get('/:id', apiLimiter, async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create publication (protected route)
router.post('/', [auth, apiLimiter, publicationValidation], async (req, res) => {
  const publication = new Publication({
    title: req.body.title,
    journal: req.body.journal,
    publicationDate: req.body.publicationDate,
    doi: req.body.doi,
    abstract: req.body.abstract,
    keywords: req.body.keywords || [],
    pdfUrl: req.body.pdfUrl || undefined,
    featured: req.body.featured || false
  });
  try {
    const newPublication = await publication.save();
    res.status(201).json(newPublication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update publication (protected route)
router.patch('/:id', [auth, apiLimiter, publicationValidation], async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    Object.keys(req.body).forEach(key => {
      publication[key] = req.body[key];
    });
    const updatedPublication = await publication.save();
    res.json(updatedPublication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete publication (protected route)
router.delete('/:id', [auth, apiLimiter], async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json({ message: 'Publication deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 