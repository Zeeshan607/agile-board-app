import express from "express";
const AuthRoutes = express.Router();
import {StatusCodes} from 'http-status-codes';
import { validateBoard, validateBoardIdParam, validateTask, validateParentTaskId } from "../middleware/validationMiddleware.js";
import userController from "../controllers/userController.js";
import boardController from '../controllers/boardController.js';
import boardColumnController from "../controllers/boardColumnController.js";
import roleController from "../controllers/roleController.js";
import workspaceController from "../controllers/workspaceController.js";
import tasksController from "../controllers/tasksController.js";
import SubTasksController from "../controllers/subTasksController.js";
import taskDiscussionController from "../controllers/taskDiscussionController.js";
import editorUploadService from "../services/editorUploadService.js";
import { upload } from "../utils/StorageConfig.js";
import InvitationController from "../controllers/InvitationController.js";



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
AuthRoutes.post("/task/store",validateTask, tasksController.store);
AuthRoutes.post('/task_column/update', tasksController.updateColumnOfTask);
AuthRoutes.post('/task/:id/meta/update',tasksController.updateAttribute);
AuthRoutes.get('/task/:task_id/subtasks',validateParentTaskId, SubTasksController.index );

AuthRoutes.post('/subtask/store', SubTasksController.store);
AuthRoutes.patch('/subtask/:id/update', SubTasksController.update);
AuthRoutes.patch('/subtask/:id/mark_as_complete', SubTasksController.markAsComplete);
AuthRoutes.patch('/subtask/:id/mark_as_in_complete', SubTasksController.markAsInComplete);
AuthRoutes.delete('/subtask/:id/delete', SubTasksController.destroy);
AuthRoutes.delete('/task/:task_id/subtasks/delete_all', SubTasksController.destroyAllWithParentId);


AuthRoutes.get('/task/:id/discussions', taskDiscussionController.index)


AuthRoutes.get('/users',userController.index);
AuthRoutes.get('/workspaces', workspaceController.index);
AuthRoutes.post('/workspace/:id/update',workspaceController.update)
AuthRoutes.post('/workspace/store', workspaceController.store);

AuthRoutes.get('/workspace/:id/members', workspaceController.getMemebers);
AuthRoutes.get('/workspace/:id/boards', workspaceController.getBoards);
AuthRoutes.post('/set_last_active_workspace',userController.set_last_active_workspace);
AuthRoutes.post('/user/setLastActiveboard', userController.set_last_active_board);

AuthRoutes.post('/comment/store',taskDiscussionController.store);
AuthRoutes.patch('/comment/:id/udpate',taskDiscussionController.update);
AuthRoutes.delete('/comment/:id/destroy',taskDiscussionController.destroy);

AuthRoutes.delete('/task/:task_id/discussion/destroy_all',taskDiscussionController.destroy_all)



//images upload from editor related routes
AuthRoutes.use('/uploads', express.static('uploads'));
AuthRoutes.post('/editor/image/upload',upload.single('file'), editorUploadService.imageUpload);
AuthRoutes.post('/editor/image/remove_uploaded', editorUploadService.imageDeleteUploaded);
AuthRoutes.get('/editor/image_manager/get_uploads_files_list', editorUploadService.getUploadsDirectoryToListFiles);

AuthRoutes.post('/send_invite_to_member', InvitationController.sendInvite);



export default AuthRoutes;