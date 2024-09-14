import { StatusCodes } from "http-status-codes";
import BoardColumn from "../models/BoardColumnModel.js";
import Board from "../models/BoardModel.js";
import Task from '../models/TaskModel.js';
import sequelize from '../db.js';
import TaskDiscussion from "../models/TaskDiscussion.js";
class BoardColumnController {
    constructor(){}


    async index(req, res){
        const {slug} = req.params;

        const board= await Board.findOne({where:{slug:slug}})
        if(!board) return res.status(StatusCodes.NOT_FOUND).json({'msg':`Board with name "${slug}"  not found`})
        const columns= await BoardColumn.findAll({where:{boardId:board.id},order:[['order','ASC']]},{group:'boardId'});
        return  res.status(StatusCodes.OK).json({columns:columns});
    }

    async updateOrder(req, res){
        const {updatedColumns}=req.body;

        try {
            // Loop through the reordered columns and update the order in the database
            const updatePromises =updatedColumns.map(async (column, index) => {
              return await BoardColumn.update(
                { order: index + 1 }, // Set new order (adjust index as needed)
                { where: { id: column.id } } // Find the column by its ID
              );
            });
        
            // Wait for all updates to complete
            await Promise.all(updatePromises);
        
            return res.status(200).json({ msg: 'Columns order updated successfully!' });
          } catch (error) {
            // console.error("Error updating columns order:", error);
            return res.status(500).json({ msg: 'Error updating columns order', error });

    }


    
}
 async store(req, res){
  const {board_id, name, description}=req.body;

  const lastColumn = await BoardColumn.findOne({ 
    where: { boardId: board_id }, 
    order: [['order', 'DESC']] 
  });
  
 const newOrder = lastColumn ? lastColumn.order + 1 : 0
  const column=await BoardColumn.create({'name':name, "boardId":board_id,"description":description, 'order':newOrder});
    
  const columnsTasks= await BoardColumn.findOne({where:{boardId:board_id, id:column.id},attributes: ['id', 'name','description'],
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


  res.status(StatusCodes.OK).json({'column':columnsTasks,"msg":"Column created successfully"});

 }


}

export default new BoardColumnController();


