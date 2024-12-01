const { body } = require('express-validator');

const validationUser = [
    // Validate name (non-empty and at least 3 characters)
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name should be at least 3 characters long'),

    // Validate email (must be a valid email format)
    body('email')
        .isEmail()
        .withMessage('Not a valid e-mail address')
        .normalizeEmail(),

    // Validate password (at least 6 characters, must contain at least one number, one lowercase and one uppercase letter)
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/[0-9]/)
        .withMessage('Password must contain a number')
        .matches(/[a-z]/)
        .withMessage('Password must contain a lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter'),

    // Validate phone (should be a valid phone number, you can adjust the regex for specific formats)
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Not a valid phone number'),

    // Validate address (optional, but if provided should not be empty)
    body('address')
        .optional()
        .notEmpty()
        .withMessage('Address cannot be empty if provided')
];

module.exports = { validationUser };
