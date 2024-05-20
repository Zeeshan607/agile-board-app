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



}
export default new TaskController(); 