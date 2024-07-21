import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import Workspace from "../models/Workspace.js";
import Board from "../models/BoardModel.js";
import Task from '../models/TaskModel.js';

class workspaceController {

constructor(){}

async index(req,res){

    // get all workspaces to which current user is admin or member 
    const user_workspace= await User.findOne({where:{id:req.user.userId},
        include:[
            {
              model: Workspace,
              as: 'ownedWorkspaces',  
              include: [
                { model: Board, as: 'boards', include: [{ model: Task, as: 'tasks' }] }
              ]
            },
            {
              model: Workspace,
              as: 'sharedWorkspaces',
              include: [
                { model: Board, as: 'boards', include: [{ model: Task, as: 'tasks' }] }
              ]
            }
       ]
    });

    const formated_ws={};

    formated_ws['shared']=user_workspace.sharedWorkspaces;
    formated_ws['owned']=user_workspace.ownedWorkspaces;



    res.status(StatusCodes.OK).json({"workspace":formated_ws});



}


async getMemebers(req, res){
    const {id}= req.params;
    const ws =await Workspace.findOne({where:{id},include:[{model:User, as:'users'}]})
    res.status(StatusCodes.OK).json({"members":ws.users})
}

async getBoards(req, res){
    const {id}= req.params;
    const ws =await Workspace.findOne({where:{id},include:[{model:Board, as:'boards'}]})
    console.log(ws);
    res.status(StatusCodes.OK).json({"boards":ws.boards})
}

}

export default new workspaceController();