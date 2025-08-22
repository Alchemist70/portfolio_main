require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Publication = require('../models/Publication');
const Blog = require('../models/Blog');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Publication.deleteMany({}),
      Blog.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      username: 'Alchemist',
      email: 'abdulhadiakanni@gmail.com',
      password: 'abassakanni',
      role: 'admin'
    });
    console.log('Created admin user'); 

    // Create sample projects
    const projects = await Project.create([
      {
        title: 'Portfolio Website',
        description: 'A modern portfolio website built with React and Node.js',
        imageUrl: 'https://source.unsplash.com/random?portfolio',
        githubUrl: 'https://github.com/yourusername/portfolio',
        demoUrl: 'https://your-portfolio.com',
        technologies: ['React', 'Node.js', 'MongoDB', 'Material-UI'],
        featured: true
      },
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform with payment integration',
        imageUrl: 'https://source.unsplash.com/random?ecommerce',
        githubUrl: 'https://github.com/yourusername/ecommerce',
        demoUrl: 'https://your-ecommerce.com',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        featured: true
      }
    ]);
    console.log('Created sample projects');

    // Create sample certificates
    const certificates = await Certificate.create([
      {
        title: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        issueDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15'),
        credentialUrl: 'https://aws.amazon.com/certification/solutions-architect-associate',
        imageUrl: 'https://source.unsplash.com/random?aws',
        description: 'Professional certification for designing distributed systems on AWS',
        featured: true
      },
      {
        title: 'Google Cloud Professional Developer',
        issuer: 'Google Cloud',
        issueDate: new Date('2023-03-20'),
        credentialUrl: 'https://cloud.google.com/certification/cloud-developer',
        imageUrl: 'https://source.unsplash.com/random?google',
        description: 'Professional certification for developing applications on Google Cloud',
        featured: true
      }
    ]);
    console.log('Created sample certificates');

    // Create sample publications
    const publications = await Publication.create([
      {
        title: 'Building Scalable Microservices',
        journal: 'Medium',
        publicationDate: new Date('2023-02-10'),
        doi: '10.1234/example.2023.1',
        abstract: 'A comprehensive guide to building and deploying microservices using Node.js and Docker',
        keywords: ['Microservices', 'Node.js', 'Docker', 'Architecture'],
        featured: true
      },
      {
        title: 'Machine Learning in Production',
        journal: 'Towards Data Science',
        publicationDate: new Date('2023-04-15'),
        doi: '10.1234/example.2023.2',
        abstract: 'Essential practices for deploying and maintaining machine learning models in production',
        keywords: ['Machine Learning', 'MLOps', 'Python', 'Production'],
        featured: true
      }
    ]);
    console.log('Created sample publications');

    // Create sample blog posts
    const blogPosts = await Blog.create([
      {
        title: 'Getting Started with React Hooks',
        slug: 'getting-started-with-react-hooks',
        content: 'A comprehensive guide to understanding and implementing React Hooks...',
        excerpt: 'Learn how to use React Hooks to simplify your functional components',
        imageUrl: 'https://source.unsplash.com/random?react',
        tags: ['React', 'JavaScript', 'Web Development'],
        featured: true
      },
      {
        title: 'Building RESTful APIs with Node.js',
        slug: 'building-restful-apis-with-nodejs',
        content: 'Learn how to create scalable and maintainable REST APIs...',
        excerpt: 'A step-by-step guide to building RESTful APIs using Node.js and Express',
        imageUrl: 'https://source.unsplash.com/random?nodejs',
        tags: ['Node.js', 'Express', 'API Design'],
        featured: true
      }
    ]);
    console.log('Created sample blog posts');

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 