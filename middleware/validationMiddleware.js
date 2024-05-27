import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import Board from "../models/BoardModel.js";
import Workspace from "../models/workspace.js";
import Task from '../models/TaskModel.js';


const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

//   export const validateTest = withValidationErrors([
//     body('name')
//       .notEmpty()
//       .withMessage('name is required')
//       .isLength({ min: 3, max: 50 })
//       .withMessage('name must be between 3 and 50 characters long')
//       .trim(),
//   ]);

export const ValidateUser = withValidationErrors([
  body("username").notEmpty().withMessage("Name required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const user = await User.findOne({ where:{'email':email} });
      if (user) {
        throw new BadRequestError("User already exist with this email address");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password length should be alteast 8 charactor long"),
]);

export const validateUserParam = withValidationErrors([
  param("id")
    .custom(async (val) => {
      const user = await User.findById({ val });
      if (!user) throw new NotFoundError(`No User found with id ${val}`);
    })
    .withMessage("invalid User id"),
]);

export const ValidateUserCredentials = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const user = await User.findOne({ where:{'email':email} });
      if (!user) {
        throw new BadRequestError("Incorrect credentials");
      }
    }),
  body("password").notEmpty().withMessage("password is required"),
]);

// export const validateProject = withValidationErrors([
//   body("name").notEmpty().withMessage("Project name required"),
//   body("description").notEmpty().withMessage("Project description required"),
// ]);

// export const validateProjectIdParam = withValidationErrors([
//   param("id")
//     .custom(async (val) => {
//       const isValidID = mongoose.Types.ObjectId.isValid(val);
//       if (!isValidID) throw new BadRequestError("invalid MongoDB id");
//       // const id=ObjectId(val)
//       const project= await Project.findById(val);
//       if(!project) throw new NotFoundError(`No Project found with id ${val}`);
//     }).withMessage("invalid MongoDB id"),
// ]);

export const validateBoard = withValidationErrors([
  body("name").notEmpty().withMessage("Board name required"),
  body("description").notEmpty().withMessage("Board description required"),
  body('ws_id').custom(async (val)=>{

        const ws=await Workspace.findById(val);

        if(!ws) throw new NotFoundError(`No workspace found with id ${val}`);

  }).withMessage("invalid ws_id"),
]);
export const validateBoardIdParam = withValidationErrors([
  param("id")
    .custom(async (val) => {
      // console.log(val)
      const board= await Board.findById(val);
      if(!board) throw new NotFoundError(`No Board found with id ${val}`);
    }).withMessage("invalid record id"),
]);


export const validateTask= withValidationErrors([
  body('title').notEmpty().withMessage('Task title Required'),
  body('description').notEmpty().withMessage('Task Description required'),
  body('column_id').custom(async (val)=>{
        const task=await Task.findById(val);
        if(!task){
          throw new NotFoundError(`No Task found with id ${val}`);
        }
  }).withMessage('invalid column id')
])