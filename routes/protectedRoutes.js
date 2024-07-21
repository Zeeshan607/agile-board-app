import express from "express";
const AuthRoutes = express.Router();
import {StatusCodes} from 'http-status-codes';
import { validateBoard, validateBoardIdParam, validateTask } from "../middleware/validationMiddleware.js";
import userController from "../controllers/userController.js";
import boardController from '../controllers/boardController.js';
import boardColumnController from "../controllers/boardColumnController.js";
import roleController from "../controllers/roleController.js";
import workspaceController from "../controllers/workspaceController.js";
import tasksController from "../controllers/tasksController.js";





// user
AuthRoutes.get("/get_current_user",userController.getCurrectUser);



// board module Routs
AuthRoutes.get('/boards/:ws_id', boardController.getBoards);//list
AuthRoutes.post('/board/create', validateBoard, boardController.store);// store new one
AuthRoutes.get('/board/:id',validateBoardIdParam, boardController.single);//get by id
AuthRoutes.patch('/board/:id',validateBoardIdParam,validateBoard,  boardController.update);// update by id
AuthRoutes.delete('/board/:id',validateBoardIdParam, boardController.delete);// delete by id


AuthRoutes.get('/board/:slug/columns', boardColumnController.index);// get all columns of specific board

AuthRoutes.get('/board/:slug/tasks', tasksController.index);// get all tasks of specific board;
AuthRoutes.post("/task/store",validateTask, tasksController.store)


AuthRoutes.get('/users',userController.index)
AuthRoutes.get('/workspaces', workspaceController.index);
AuthRoutes.get('/workspace/:id/members', workspaceController.getMemebers);
AuthRoutes.get('/workspace/:id/boards', workspaceController.getBoards);
AuthRoutes.post('/set_last_active_workspace',userController.set_last_active_workspace);

export default AuthRoutes;