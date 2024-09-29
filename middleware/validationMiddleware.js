import { check,body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import Board from "../models/BoardModel.js";
import Workspace from "../models/Workspace.js";
import Task from '../models/TaskModel.js';
import BoardColumn from "../models/BoardColumnModel.js";
import SubTask from "../models/SubTask.js";
import TaskDiscussion from "../models/TaskDiscussion.js";

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
  body("username").notEmpty().trim().withMessage("Name required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address").trim()
    .custom(async (email) => {
      const user = await User.findOne({ where:{'email':email} });
      if (user) {
        throw new BadRequestError("User already exist with this email address");
      }
    }).withMessage('User with this Email already exists.'),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password length should be alteast 8 charactor long"),
]);

export const validateUserParam = withValidationErrors([
  param("id")
    .custom(async (val) => {
      const user = await User.findByPk(val);
      if (!user) throw new NotFoundError(`No User found with id ${val}`);
    }).isInt()
    .withMessage("invalid User id"),
]);

export const validateUserId =withValidationErrors([
  body("user_id")
    .custom(async (val) => {
      const user = await User.findByPk(val);
      if (!user) throw new NotFoundError(`No User found with id ${val}`);
    }).isInt()
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

export const validateWorkpsaceId=withValidationErrors([
  param("id")
    .custom(async (val) => {
      const ws=await Workspace.findByPk(val);
      if(!ws) {
        throw new NotFoundError(`No workspace found with id ${val}`);
        }
   
    }).isUUID().withMessage('Invalid Workspace ID')
])

export const validateWorkpsaceIdForBoards=withValidationErrors([
  param("ws_id")
    .custom(async (val) => {
      const ws=await Workspace.findByPk(val);
      if(!ws) {
        throw new NotFoundError(`No workspace found with id ${val}`);
        }
    }).isUUID().withMessage('Invalid Workspace ID')
])

export const validateBoard = withValidationErrors([
  body("name").notEmpty().escape().trim().withMessage("Board name required"),
  body("description").notEmpty().escape().trim().withMessage("Board description required"),
  body('ws_id').custom(async (val,{req})=>{
    if (req.method === "POST") {   
       const ws=await Workspace.findByPk(val);
        if(!ws) {
          throw new NotFoundError(`No workspace found with id ${val}`);
          }
        }
  }).isUUID().withMessage("invalid ws_id"),
]);


export const validateBoardIdParam = withValidationErrors([
  param("id")
    .custom(async (val) => {
      const board= await Board.findByPk(val);
      if(!board) throw new NotFoundError(`No Board found with id ${val}`);
    }).isInt().withMessage("invalid record id"),
]);


export const validateTask= withValidationErrors([
  body('title').notEmpty().escape().trim().withMessage('Task title Required'),
  body('description').notEmpty().escape().trim().withMessage('Task Description required'),
  body('column_id').custom(async (val)=>{
        const column= await BoardColumn.findByPk(val);
        if(!column){
          throw new NotFoundError(`No Column found with id ${val}`);
        }
  }).isUUID().withMessage('invalid column id'),

  body("board_id").custom(async (val) => {
    const board= await Board.findByPk(val);
    if(!board) throw new NotFoundError(`No Board found with id ${val}`);
  }).isInt().withMessage("invalid board id"),


])

export const validateParentTaskId=withValidationErrors([
  param('task_id').custom(async (val)=>{
    const task= await Task.findByPk(val);
    if(!task){
      throw new NotFoundError(`Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('invalid parameter task_id')
])

export const validateColumn=withValidationErrors([
  body('board_id').custom(async (val)=>{
    const board=await Board.findByPk(val);
    if(!board){
      throw new NotFoundError(`Board with id ${val} does not Exist`);
    }
  }).isInt().withMessage('Invalid Board Id, Please try again'),
  body('name').notEmpty().escape().trim().withMessage('Name field required'),
  body('description').notEmpty().escape().trim().withMessage('Description field required'),
]);

export const validateTaskAndColumnId=withValidationErrors([
  body('task_id').notEmpty().isInt().custom(async(val)=>{
    const task=await Task.findByPk(val);
    if(!task){
      throw new NotFoundError(`Task with id ${val} does not exist`);
    }

  }).withMessage('Invalid task id please try again'),
  body('column_id').notEmpty().isUUID().custom(async (val)=>{
    const column=await BoardColumn.findByPk(val);
    if(!column){
      throw new NotFoundError(`Column with id ${val} does not exist`);
    }
  }).withMessage('invalid column id. Please try again'),
]);

export const validateTaskArrayAndColumnId=withValidationErrors([

  body('tasks').isArray({ min: 0 }).withMessage('Invalid tasks array'),
  param('column_id').notEmpty().isUUID().custom(async (val)=>{
    const column=await BoardColumn.findByPk(val);
    if(!column){
      throw new NotFoundError(`Column with id ${val} does not exist`);
    }
  }).withMessage('invalid column id. Please try again'),

]);

export const validateTaskIdAndDataObject=withValidationErrors([
  param('id').custom(async (val)=>{
    const task= await Task.findByPk(val);
    if(!task){
      throw new NotFoundError(`Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('invalid parameter task_id'),

  check('title').optional().notEmpty().trim().escape().isString().withMessage('Invalid Title format'),
  check('priority').optional().notEmpty().isInt().withMessage('Invalid Priority value'),
  check('due_date').optional().notEmpty().isISO8601().withMessage('Invalid Due Date value'),
  check('description').optional().notEmpty().withMessage('Description input is empty please add some text'),

]);

export const validateSubTaskCreation=withValidationErrors([
  body('task_id').custom(async (val)=>{
    const task= await Task.findByPk(val);
    if(!task){
      throw new NotFoundError(`Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('Invalid attribute task_id'),
  body('description').notEmpty().withMessage('Description required'),

]);

export const validateSubTaskUpdate=withValidationErrors([
  param('id').custom(async (val)=>{
    const sb= await SubTask.findByPk(val);
    if(!sb){
      throw new NotFoundError(`Sub Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('Invalid attribute subtask_id'),
  body('subTask').notEmpty().trim().escape().withMessage('Description required'),

]);

export const validateIsCompleteBooleanWithSubTaskId=withValidationErrors([
  param('id').notEmpty().isInt().custom(async(val)=>{

      const sb=await SubTask.findByPk(val);
      if(!sb){
        throw new NotFoundError(`Sub task with id ${val} does not exist`);
      
      }

  }).withMessage('Invalid Sub Task Id'),
  body('is_completed').notEmpty().isBoolean(),

]);

export const validateTask_idParam=withValidationErrors([
  param('task_id').custom(async (val)=>{
    const task= await Task.findByPk(val);
    if(!task){
      throw new NotFoundError(`Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('Invalid attribute task_id'),
]);

export const validateTaskIdParamAsId=withValidationErrors([
  param('id').custom(async (val)=>{
    const task= await Task.findByPk(val);
    if(!task){
      throw new NotFoundError(`Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('Invalid attribute task_id'),
]);

export const validateSubTaskIdParamAsId=withValidationErrors([
  param('id').custom(async (val)=>{
    const sb= await SubTask.findByPk(val);
    if(!sb){
      throw new NotFoundError(`Sub Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('Invalid attribute Sub task id'),
]);
export const validateWorkspaceTitle=withValidationErrors([
body('title').notEmpty().escape().trim().withMessage('Title feild required'),
]);
export const validateUserWorkspaceAccessRemoval=withValidationErrors([
  body("workspace_id")
    .custom(async (val) => {
      const ws=await Workspace.findByPk(val);
      if(!ws) {
        throw new NotFoundError(`No workspace found with id ${val}`);
        }
   
    }).isUUID().withMessage('Invalid Workspace ID'),

    body("user_id")
    .custom(async (val) => {
      const user = await User.findByPk(val);
      if (!user) throw new NotFoundError(`No User found with id ${val}`);
    }).isInt()
    .withMessage("invalid User id"),
]);
export const validateInvite=withValidationErrors([
  body("workspace_id")
    .custom(async (val) => {
      const ws=await Workspace.findByPk(val);
      if(!ws) {
        throw new NotFoundError(`No workspace found with id ${val}`);
        }
   
    }).isUUID().withMessage('Invalid Workspace ID'),
      body('email').isEmail().withMessage('Given email is Not Valid Email address').notEmpty().withMessage('Email feild requried'),

]);
export const validateSrc=withValidationErrors([
  body('src').notEmpty().isString().trim().withMessage('image path Required'),
])
export const validateWsId=withValidationErrors([
  body("wsId")
    .custom(async (val) => {
      const ws=await Workspace.findByPk(val);
      if(!ws) {
        throw new NotFoundError(`No workspace found with id ${val}`);
        }
   
    }).isUUID().withMessage('Invalid Workspace ID'),
]);

export const validateBoardSlug=withValidationErrors([
  body('boardSlug').isString().notEmpty().custom(async(val)=>{
      const b=await Board.findOne({where:{'slug':val}});
      if(!b){
        throw new NotFoundError(`Board with slug ${val} does not exist`);
      }
  }).withMessage('board with given slug does not exist'),
])
export const validateComment=withValidationErrors([
  body('task_id').custom(async (val)=>{
    const task= await Task.findByPk(val);
    if(!task){
      throw new NotFoundError(`Task with id ${val} does not Exist`);
    }
  }).isInt().withMessage('Invalid task id'),
  body('message').notEmpty().withMessage('Comment feild Required'),
]);

export const validateCommentUpdate=withValidationErrors([
  param("id").isInt().notEmpty().custom(async(val)=>{
    const comment=await TaskDiscussion.findByPk(val);
    if(!comment){
      throw new NotFoundError(`Comment with id ${val} does not exist`);
    }
  }).withMessage('Invalid Comment id'),
    body('message').notEmpty().withMessage('Comment feild Required'),


]);

export const validateCommentId=withValidationErrors([
  param("id").isInt().notEmpty().custom(async(val)=>{
    const comment=await TaskDiscussion.findByPk(val);
    if(!comment){
      throw new NotFoundError(`Comment with id ${val} does not exist`);
    }
  }).withMessage('Invalid Comment id'),

]);

// export const validateUserTourStatus=withValidationErrors([
// body('status').notEmpty().isBoolean().withMessage('invalid Tour status value.'),
// ])