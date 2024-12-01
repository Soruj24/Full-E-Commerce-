const { validationResult } = require("express-validator");

const checkValidationResult = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        // Format errors into a single string
        const errors = result.array().map(err => `${err.param}: ${err.msg}`).join(', ');
        return res.status(400).json({ errors });
    }
    next()
};

module.exports = checkValidationResult;
