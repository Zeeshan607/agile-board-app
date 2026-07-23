import Board from '../models/BoardModel.js';
import BoardColumn from '../models/BoardColumnModel.js';
import StatusCodes from 'http-status-codes';
import Workspace from '../models/Workspace.js';
import Task from '../models/TaskModel.js';
import SubTask from '../models/SubTask.js';
import TaskDiscussion from '../models/TaskDiscussion.js';
import sequelize from '../db.js';

class BoardController{

constructor(){}

  async getBoards(req, res){
    const {ws_id}=req.params;
    const data= await Board.findAll({where:{workspace_id:ws_id}});
    return res.status(200).json(data);
 }

 async single(req, res){
  const {id}=req.params;
  const board= await Board.findByPk(id);
  if(!board){
    return res.status(StatusCodes.NOT_FOUND).json({'msg':"board not found"});
  }
   return res.json(board);
 }

async getByWsIdAndSlug(req, res){
  const {wsId, boardSlug}=req.params;
  const board= await Board.findOne({where:{'workspace_id':wsId, 'slug':boardSlug}});
  if(!board){
    return res.status(StatusCodes.NOT_FOUND).json({'msg':"board not found"});
  }
   return res.json({"board":board});
 }



// create
 async store (req, res) {
    const { name, description, ws_id } = req.body;
    const workspace=await Workspace.findByPk(ws_id);
    if(!workspace){
      return res.status(StatusCodes.NOT_FOUND).json({msg:"Workspace with given Id is not found"});
    }
    // console.log(workspace);
    const slug= name.replaceAll(' ','-');
    const board=await Board.create({name, description,'slug':slug, 'workspace_id':workspace.id});
    const def_boardstatus=await BoardColumn.bulkCreate([
      {name:'To Do', description:"List of all tasks that we have to do.",boardId:board.id,order:1},
      {name:'In Progress', description:"All tasks that are under development",boardId:board.id,order:2},
      {name:'Completed', description:"All completed tasks",boardId:board.id,order:3}
    ])
    return res.status(StatusCodes.OK).json({'board':board});
};
// update
async update(req, res){
  const {id}=req.params;
  const board= await Board.findByPk(id);
  if(!board){
    return res.status(404).json({'msg':`Board with ${id} not found`});
  }
    // Whitelist editable fields only — req.body must never be mass-assigned directly onto the model
    // (a client could otherwise smuggle workspace_id or other columns into the update).
    const {name, description} = req.body;
    const updateObject = {};
    if(name !== undefined) updateObject.name = name;
    if(description !== undefined) updateObject.description = description;
    const ub=await board.update(updateObject)
   return res.status(StatusCodes.OK).json({"board":ub,msg:"Board updated successfully"});
 }

//  async


async delete(req, res){
  const {id}=req.params;
  const board=await Board.findByPk(id);
  if(!board){
    return res.status(StatusCodes.NOT_FOUND).json({msg:`Board with id ${id} not found`});
  }

  // Deleting a board must also remove its Tasks/SubTasks/Comments — these were previously
  // orphaned since only BoardColumns were explicitly cleaned up. Done in a transaction so a
  // failure partway through doesn't leave the board half-deleted.
  await sequelize.transaction(async (t) => {
    const tasks = await Task.findAll({where:{board_id:board.id}, transaction:t});
    const taskIds = tasks.map(task => task.id);
    if(taskIds.length){
      await SubTask.destroy({where:{task_id:taskIds}, transaction:t});
      await TaskDiscussion.destroy({where:{task_id:taskIds}, transaction:t});
      await Task.destroy({where:{id:taskIds}, transaction:t});
    }
    await BoardColumn.destroy({where:{boardId:board.id}, transaction:t});
    await board.destroy({transaction:t});
  });

   return res.status(StatusCodes.OK).json({msg:"Board deleted successfully",board_id:board.id} );
 }







}






export default new BoardController();
// Define your controller methods
// exports.getExamples = async (req, res) => {
//   try {
//     const examples = await BoardService.getExamples();
//     res.json(examples);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


