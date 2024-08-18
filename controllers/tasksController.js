import { StatusCodes } from "http-status-codes";
import Board from '../models/BoardModel.js';
import Task from '../models/TaskModel.js';
import { NotFoundError } from "../errors/customErrors.js";

class TaskController {

constructor(){}


async index(req, res){
    const {slug}=req.params;
    const board=await Board.findOne({where:{'slug':slug}});
    if(!board){
        throw new NotFoundError(`board with given slug: ${slug} not found`);
    }
    const tasks= await Task.findAll({where:{board_id:board.id}})
    res.status(StatusCodes.OK).json({'tasks':tasks })
}



async store(req, res){
    let {title, description, column_id, board_id, assigned_to}=req.body;
    if(!assigned_to){
        assigned_to=null;
    }
    const task = await  Task.create({title, description, column_id, board_id, assigned_to});
    res.status(StatusCodes.OK).json({task:task,msg:"Task created successfully"})
}


async updateColumnOfTask(req, res){
    const {task_id, column_id}=req.body;

     const task= await Task.findOne({where:{id:task_id}});
     if(!task){
        throw new NotFoundError('Task with given task_id not found');
     }
     task.update({column_id:column_id});
     res.status(StatusCodes.OK).json({task:task,msg:"Task status updated successfully"})
}



async updateAttribute(req, res){
        const data= req.body;
        const {id}= req.params;
        
     const task= await Task.findOne({where:{id:id}});
     if(!task){
        throw new NotFoundError('Task with given task_id not found');
     }
     task.update(data);
     res.status(StatusCodes.OK).json({task:task,msg:"Task "+Object.keys(data)+" updated successfully"})
}




}
export default new TaskController(); 