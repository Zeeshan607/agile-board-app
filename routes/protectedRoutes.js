import express from "express";
const AuthRoutes = express.Router();
import {StatusCodes} from 'http-status-codes';
import { validateBoard, validateBoardIdParam } from "../middleware/validationMiddleware.js";
import userController from "../controllers/userController.js";
import boardController from '../controllers/boardController.js';
import boardColumnController from "../controllers/boardColumnController.js";
import roleController from "../controllers/roleController.js";
import workspaceController from "../controllers/workspaceController.js";





// user
AuthRoutes.get("/get_current_user",userController.getCurrectUser);



// board module Routs
AuthRoutes.get('/boards/', boardController.getBoards);//list
AuthRoutes.post('/board/create', validateBoard, boardController.store);// store new one
AuthRoutes.get('/board/:id',validateBoardIdParam, boardController.single);//get by id
AuthRoutes.patch('/board/:id',validateBoardIdParam,validateBoard,  boardController.update);// update by id
AuthRoutes.delete('/board/:id',validateBoardIdParam, boardController.delete);// delete by id


AuthRoutes.get('/board/columns/:slug', boardColumnController.index);

AuthRoutes.get('/users',userController.index)
AuthRoutes.get('/workspaces', workspaceController.index);



export default AuthRoutes;