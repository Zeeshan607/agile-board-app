import { StatusCodes } from "http-status-codes";
import SubTask from "../models/SubTask.js";





class SubTasksController{



async index(req, res){
    const {task_id}=req.params;
    // console.log(task_id);
    const subTasks= await SubTask.findAll({where:{task_id:task_id}});
    res.status(StatusCodes.OK).json({'subTasks':subTasks});
}

async store(req, res){
    let {task_id, description}=req.body;
    const st=await SubTask.create({description, task_id});
    res.status(StatusCodes.OK).json({'msg':'Sub Task created successfully','subTask':st});

}


async update(req, res){

}

async destroy(req, res){

}



}

export default new SubTasksController();