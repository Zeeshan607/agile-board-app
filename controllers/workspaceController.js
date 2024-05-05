import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import Workspace from "../models/workspace.js";



class workspaceController {

constructor(){}

async index(req,res){

    const user_workspace= await User.findOne({where:{id:req.user.userId},include:[{model:Workspace, as:"workspace"}]});
        const workspaces=user_workspace.workspace;
    res.status(StatusCodes.OK).json({"workspaces":workspaces});



}



}

export default new workspaceController();