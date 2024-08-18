import { StatusCodes } from "http-status-codes";
import BoardColumn from "../models/BoardColumnModel.js";
import Board from "../models/BoardModel.js";
import Task from '../models/TaskModel.js';
import sequelize from '../db.js';
class BoardColumnController {
    constructor(){}


    async index(req, res){
        const {slug} = req.params;
        console.log(slug)
        const board= await Board.findOne({where:{slug:slug}})
        if(!board) return res.status(StatusCodes.NOT_FOUND).json({'msg':`Board with name "${slug}"  not found`})
        const columns= await BoardColumn.findAll({where:{boardId:board.id},order:[['order','ASC']] ,
            include: [{
              model: Task,
              as:"Tasks"
              // where: { column_id: sequelize.col('column.id') }
            }]
    },{group:'boardId'});
       
       return  res.status(StatusCodes.OK).json({columns:columns});
    }



}

export default new BoardColumnController();


