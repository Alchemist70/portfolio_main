const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('imageUrl').trim().notEmpty().withMessage('Image URL is required'),
  body('githubUrl').trim().notEmpty().withMessage('GitHub URL is required'),
  body('demoUrl').trim().notEmpty().withMessage('Demo URL is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  validate
];

const certificateValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('issuer').trim().notEmpty().withMessage('Issuer is required'),
  body('issueDate').isISO8601().withMessage('Valid issue date is required'),
  body('expiryDate').optional({ nullable: true }).isISO8601().withMessage('Valid expiry date is required'),
  body('credentialUrl').trim().notEmpty().withMessage('Credential URL is required'),
  body('imageUrl').trim().notEmpty().withMessage('Image URL is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
  validate
];

const publicationValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('journal').trim().notEmpty().withMessage('Journal name is required'),
  body('publicationDate').isISO8601().withMessage('Valid publication date is required'),
  body('doi').trim().notEmpty().withMessage('DOI is required'),
  body('abstract').trim().notEmpty().withMessage('Abstract is required'),
  body('keywords').optional().isArray().withMessage('Keywords must be an array'),
  body('pdfUrl').optional({ nullable: true }).isURL().withMessage('PDF URL must be a valid URL'),
  body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
  validate
];

const blogValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('imageUrl').trim().notEmpty().withMessage('Image URL is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('readTime').trim().notEmpty().withMessage('Read time is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('link').trim().notEmpty().withMessage('Link is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
  validate
];

module.exports = {
  projectValidation,
  certificateValidation,
  publicationValidation,
  blogValidation
}; 