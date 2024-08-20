import { StatusCodes } from "http-status-codes";
import SubTask from "../models/SubTask.js";





class SubTasksController{



async index(req, res){
    const {task_id}=req.params;
    const subTasks= await SubTask.findAll({where:{task_id:task_id}});
    res.status(StatusCodes.OK).json({'subTasks':subTasks});
}

async store(req, res){
    let {task_id, description}=req.body;
    const st=await SubTask.create({description, task_id});
    res.status(StatusCodes.OK).json({'msg':'Sub Task created successfully','subTask':st});

}


async update(req, res){
    let {id}=req.params;
    let {subTask}=req.body;
    const st=await SubTask.findByPk(id);
    const udpated_st=await st.update(subTask);
    res.status(StatusCodes.OK).json({'msg':"Sub Task Updated Successfully",'subTask':udpated_st});
}

async markAsComplete(req, res){
    let {id}=req.params;
    let {is_completed}=req.body;
    const st=await SubTask.findByPk(id);
    const udpated_st=await st.update({"is_completed":is_completed});
    res.status(StatusCodes.OK).json({'msg':"Sub Task Updated Successfully",'subTask':udpated_st});
}

async markAsInComplete(req, res){
    let {id}=req.params;
    let {is_completed}=req.body;
    const st=await SubTask.findByPk(id);
    const udpated_st=await st.update({"is_completed":is_completed});
    res.status(StatusCodes.OK).json({'msg':"Sub Task Updated Successfully",'subTask':udpated_st});
}

async destroy(req, res){
    let {id}=req.params;
    const st=await SubTask.findByPk(id);
            await st.destroy();
    res.status(StatusCodes.OK).json({'msg':"Sub Task Updated Successfully",'subTask':st});
}

async destroyAllWithParentId(req,res){
    let {task_id}=req.params;
    const st=await SubTask.destroy({where:{task_id:task_id}});
    res.status(StatusCodes.OK).json({'msg':"Sub Tasks list Deleted Successfully",});
}


}

export default new SubTasksController();