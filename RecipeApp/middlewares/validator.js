const { check, validationResult } = require("express-validator");


exports.registerRules = () =>
[  
    check("firstname","firstname is required").notEmpty(),
    check("lastname","lastname is required").notEmpty(),  
    check("email","email is required").notEmpty(),
    check("password","password is required").notEmpty(),
    check("email","Email not valid").isEmail(),
    check("password","password must be atleast 6 characters").isLength({ min: 5 }).matches(/(?=.*?[A-Z])(?=.*[0-9])/).withMessage('password must contain atleast a capital letter,  a number'),


    
];



exports.loginRules = () => [
    check("email", "This field is required").notEmpty(),
    check("password", "This field is required").notEmpty(),
  ];
exports.productRules = () => [
    // check("name", "This field is required").notEmpty(),
    // check("ingredient", "This field is required").notEmpty(),
    ];
  
exports.validator = (req, res, next) => {
    const errors = validationResult(req);
  
    errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
  };

