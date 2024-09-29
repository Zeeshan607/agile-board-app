import User from "../models/UserModel.js";
import { hashMake } from "../utils/helpers.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Board from "../models/BoardModel.js";
import path, { dirname } from "path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import Workspace from "../models/Workspace.js";
import Task from "../models/TaskModel.js";
import SubTask from "../models/SubTask.js";
import TaskDiscussion from "../models/TaskDiscussion.js";
import UserWorkspace from "../models/UserWorkspace.js";
import BoardColumn from "../models/BoardColumnModel.js";

var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);


class UserController {

constructor(){}


async index(req, res){
    const users=await User.findAll({where:{id:req.user.userId}});
    res.status(StatusCodes.OK).json({'users':users })
}
async getCurrectUser(req, res){
    const user=await User.findOne({where:{id:req.user.userId}});
    res.status(StatusCodes.OK).json({'user':user })
}

async set_last_active_workspace(req, res){
    const {wsId}=req.body;
    try{
        await User.update({last_active_workspace:wsId},{where:{id:req.user.userId}});
    }catch(err){
        throw new BadRequestError(err) ;
    }
    res.status(StatusCodes.OK).json({'msg':"Workspace activated successfully" })

}

async set_last_active_board(req, res){
    const {boardSlug}=req.body;
    try{
        const board=await Board.findOne({where:{slug:boardSlug}});
        await User.update({last_active_board:board.id},{where:{id:req.user.userId}});
    }catch(err){
        throw new BadRequestError(err) ;
    }
    res.status(StatusCodes.OK).json({'msg':"board set successfully" })

}

async updateProfilePicture(req, res){
    const {user_id}=req.body;
    if (req.file) {
        const user=await User.findByPk(user_id);
      
           if(user.image){
                const baseName = user.image.replace(/^\/api\/v1\/dashboard\/uploads\//, "");
                const filePath = path.join(__dirname, "/../uploads/", baseName);

                fs.unlink(filePath, (err) => {
                    if (err) {
                    return res.status(500).json({
                    error: "Failed to delete old image. please try again",
                    });
                    }
                });
            }

            const filePath = `/api/v1/dashboard/uploads/${req.file.filename}`;
            await user.update({'image':filePath});
            res.status(StatusCodes.OK).json({ url: filePath });
           

      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: `No image was uplaoded` });
      }
}
async deleteAccount(req, res){

        const {user}= req.body;

        const u=await User.findByPk(user.userId);
        const workspaces=await Workspace.findAll({where:{createdBy:user.userId}});

        if(workspaces){
            const wsIds= workspaces.map(ws=>ws.id);
            const boards=await Board.findAll({where:{"workspace_id":wsIds}});
   
            const sharedWorkspaces= await UserWorkspace.destroy({where:{'workspace_id':wsIds}});
            // await sharedWorkspaces.destroy();
            if(boards){
                const boardIds=boards.map(b=>b.id);
                const bc=await BoardColumn.destroy({where:{'board_id':boardIds}});
                const tasks=await Task.findAll({where:{'board_id':boardIds}});
                if(tasks){
                    const tasksIds=tasks.map(t=>t.id);
                    const subTasks=await SubTask.destroy({where:{'task_id':tasksIds}});
                    const comments=await TaskDiscussion.destroy({where:{'task_id':tasksIds,'user_id':user.userId}});
                    await Task.destroy({where:{"id":tasksIds}});
                }
                await Board.destroy({where:{"id":boardIds}});
            }
            await Workspace.destroy({where:{"id":wsIds}});
        }
     

        await u.destroy();

        res.status(StatusCodes.OK).json({'msg':"Account deleted successfully"})

}

// async updateTourStatus(req,res){
//         const {status}=req.body;
//         const user=await User.findByPk(req.user.userId);
//         await user.update({'is_tour_done':status});
//         res.status(StatusCodes.OK).json({'msg':"tour status Updated successfully"});

// }


}
export default new UserController(); 