import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import Workspace from "../models/workspace.js";
import Board from "../models/BoardModel.js";
import Task from '../models/TaskModel.js';

class workspaceController {

constructor(){}

async index(req,res){

    // get all workspaces to which current user is admin or member 
    const user_workspace= await User.findOne({where:{id:req.user.userId},
        include:[{model:Workspace, as:"workspace", include:[{model:Board, as:'boards',include:[{model:Task, as:'tasks'}]}]}]
    });
    const workspaces=user_workspace.workspace;
    const formated_workspaces={};
    // sort workspaces so that shared workspaces can be seperated
    workspaces.map(ws=>{
            if(!ws.UserWorkspace.admin && !ws.UserWorkspace.is_owner){
                formated_workspaces['shared']=[];
                formated_workspaces['shared'].push(ws)
            } else{
                formated_workspaces['owned']=[]
                formated_workspaces['owned'].push(ws)
            }
      
        })
  
    res.status(StatusCodes.OK).json({"workspace":formated_workspaces});



}


async getMemebers(req, res){
    const {id}= req.params;
    // const ws =await Workspace.findById({id,include})/

    res.status(StatusCodes.OK).json({'members':{"id":id,"name":"ahmed"}})
}



}

export default new workspaceController();