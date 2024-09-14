import { StatusCodes } from "http-status-codes";
import Board from '../models/BoardModel.js';
import Task from '../models/TaskModel.js';
import { NotFoundError } from "../errors/customErrors.js";
import TaskDiscussion from "../models/TaskDiscussion.js";
import sequelize from "../db.js";
import BoardColumn from "../models/BoardColumnModel.js";

class TaskController {

constructor(){}


async index(req, res){
    const {slug}=req.params;
    const board=await Board.findOne({where:{'slug':slug}});
    if(!board){
        throw new NotFoundError(`board with given slug: ${slug} not found`);
    }
  //   const tasks= await Task.findAll({where:{board_id:board.id}, attributes: {
  //       include: [
  //         // Add a count of Taskdiscussions
  //         [sequelize.fn('COUNT', sequelize.col('discussions.id')), 'discussionsCount']
  //       ]
  //     },
  //     include:[{model:TaskDiscussion,as:'discussions', attributes:[]},  {
  //       model: BoardColumn, // Assuming you have a 'Column' model for task columns
  //       as: 'columns', // If not, adapt accordingly
  //       attributes: ['id', 'name'], // Include the relevant column attributes
  //     }
  //   ],
  //   group: ['Task.id', 'columns.id'],
  //   order: [['column_id', 'ASC'], ['order', 'ASC']]
  // })

      
      const columnsTasks= await BoardColumn.findAll({where:{boardId:board.id},attributes: ['id', 'name','description'],
          include:[
                {
                  model:Task,
                  as:'Tasks',
                  attributes: {
                        include: [
                          // Add a count of Taskdiscussions
                          [sequelize.literal('(SELECT COUNT(*) FROM TaskDiscussions AS discussions WHERE discussions.task_id = Tasks.id)'), 'discussionsCount']
                        ]
                      },
                  include:[
                    {model:TaskDiscussion, as:'discussions', attributes:[]}
                  ]
                }
          
          ],
          group: ['Tasks.id', 'BoardColumn.id'],
          order: [['order','ASC'],[{ model: Task, as: 'Tasks' }, 'order', 'ASC']]
      });






    res.status(StatusCodes.OK).json({'columnstasks':columnsTasks })
}



async store(req, res){
    let {title, description, column_id, board_id, assigned_to}=req.body;
    if(!assigned_to){
        assigned_to=null;
    }
    const lastTask = await Task.findOne({ 
        where: { column_id: column_id }, 
        order: [['order', 'DESC']] 
      });
      
     const newOrder = lastTask ? lastTask.order + 1 : 0
    const task = await  Task.create({title, description, column_id, board_id, assigned_to, 'order':newOrder});
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

async updateOrderOfTasks(req, res){
    const {tasks}=req.body;
    const {column_id}=req.params;

    const updatePromises = tasks.map(task => 
      Task.update(
        { order: task.order }, 
        { where: { id: task.id, column_id: column_id } }  // Match by task ID and column ID
      )
    );
    // Execute all updates concurrently
    await Promise.all(updatePromises);
    res.status(StatusCodes.OK).json({'tasks':tasks,"msg":"Tasks Order Updated successfully"});
    
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