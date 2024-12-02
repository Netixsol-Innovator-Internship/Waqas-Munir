import { check } from "express-validator";

const registerValidations = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name can't be empty")
    .isString()
    .withMessage("Name can't be empty")
    .isLength({ min: 3 })
    .withMessage("Name must contain at least 3 characters")
    .isLength({ max: 15 })
    .withMessage("Name can't be longer than 15 characters"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Please enter a valid email"),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),
];

const loginValidations = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Please enter a valid email"),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),
];

const groceryValidations = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title can't be empty")
    .isLength({ min: 3 })
    .withMessage("Title must contain at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Title can't contain more than 20 characters"),

  check("description")
    .trim()
    .notEmpty()
    .withMessage("Description can't be empty")
    .isLength({ min: 5 })
    .withMessage("Description must contain at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("Description can't contain more than 50 characters"),

  check("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  check("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

const updateGroceryValidations = [
  check("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title can't be empty")
    .isLength({ min: 3 })
    .withMessage("Title must contain at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Title can't contain more than 20 characters"),

  check("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description can't be empty")
    .isLength({ min: 5 })
    .withMessage("Description must contain at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("Description can't contain more than 50 characters"),

  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  check("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

export {
  registerValidations,
  loginValidations,
  groceryValidations,
  updateGroceryValidations,
};
