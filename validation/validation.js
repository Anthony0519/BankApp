const hapiJoiValidator = require("@hapi/joi");

const validation = (req, res, next) => {
  const validateStudent = hapiJoiValidator.object({
    firstName: hapiJoiValidator.string().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/).required().messages({
      'string.empty': 'firstName cannot be empty',
      'string.min': 'Min 3 characters', // Corrected typo in the message
    }),
    lastName: hapiJoiValidator.string().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/).required().messages({
      'string.empty': 'lastName cannot be empty',
      'string.min': 'Min 3 characters',
    }),
    phoneNumber: hapiJoiValidator.string().min(11).trim().regex(/^\d{11}$/).required().messages({
      'string.empty': 'phone number cannot be empty',
      'string.pattern.base': 'Invalid phone number format', // Added a pattern validation message
  }),    
    email: hapiJoiValidator.string().email({ tlds: { allow: false } }).trim().min(5).required().messages({
      'string.empty': 'email cannot be empty',
      'string.email': 'Invalid email format',
    }),
    password: hapiJoiValidator.string().min(8).max(30).required().messages({
      'string.empty': 'password cannot be empty',
      'string.min': 'Min 8 characters for password',
      'string.max': 'Max 30 characters for password',
    }),
    pin: hapiJoiValidator.string().min(4).trim().regex(/^\d{4}$/).messages({
      'string.pattern.base': 'Enter a valid 4-digit pin', // Added a pattern validation message
  }), 
    confirmPassword: hapiJoiValidator.string().min(8).max(30).required().messages({
      'string.empty': 'confirmPassword cannot be empty',
      'string.min': 'Min 8 characters for confirmPassword',
      'string.max': 'Max 30 characters for confirmPassword',
    }),
  });

  const { message } = validateStudent.validate(req.body);

  if (message) {
    return res.status(400).json({
      message: message.details.map(detail => detail.message), // Return an array of all message messages
    });
  }

  next();
};

module.exports = validation;
