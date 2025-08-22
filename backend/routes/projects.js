const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const { projectValidation } = require('../middleware/validator');
const { getPagination, getPagingData, createSearchQuery } = require('../utils/queryHelpers');

// Get all projects with pagination and search
router.get('/', apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10, search, featured } = req.query;
    const { limit, skip } = getPagination(page, size);
    
    const searchQuery = createSearchQuery(search, ['title', 'description', 'technologies']);
    if (featured !== undefined) {
      searchQuery.featured = featured === 'true';
    }
    
    const [projects, total] = await Promise.all([
      Project.find(searchQuery)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip),
      Project.countDocuments(searchQuery)
    ]);

    res.json(getPagingData({ count: total, rows: projects }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured projects
router.get('/featured', apiLimiter, async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single project
router.get('/:id', apiLimiter, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create project (protected route)
router.post('/', [auth, apiLimiter, projectValidation], async (req, res) => {
  const project = new Project({
    title: req.body.title,
  description: req.body.description,
  imageUrl: req.body.imageUrl,
  githubUrl: req.body.githubUrl,
  demoUrl: req.body.demoUrl,
  technologies: req.body.technologies,
  featured: req.body.featured,
  status: req.body.status || 'COMPLETED'
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update project (protected route)
router.patch('/:id', [auth, apiLimiter, projectValidation], async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    Object.keys(req.body).forEach(key => {
      project[key] = req.body[key];
    });

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project (protected route)
router.delete('/:id', [auth, apiLimiter], async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 