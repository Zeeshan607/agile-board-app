import Board from '../models/BoardModel.js';
import BoardColumn from '../models/BoardColumnModel.js';
import StatusCodes from 'http-status-codes';
import Workspace from '../models/workspace.js';

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

// create
 async store (req, res) {
    const { name, description, ws_id } = req.body;
    const slug= name.replaceAll(' ','-');
    const board=await Board.create({name, description,slug:slug, workspace_id:ws_id});
    const def_boardstatus=await BoardColumn.bulkCreate([
      {name:'To Do', description:"List of all tasks that we have to do.",boardId:board.id,createdBy:req.user.userId,order:1},
      {name:'In Progress', description:"All tasks that are under development",boardId:board.id,createdBy:req.user.userId,order:2},
      {name:'Completed', description:"All completed tasks",boardId:board.id,createdBy:req.user.userId,order:3}
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
    const b=await board.update(req.body)
   return res.status(StatusCodes.OK).json({msg:"Board updated successfully"});
 }

//  async 


async delete(req, res){
  const {id}=req.params;
  const board=await Board.findByPk(id);
            await board.destroy();
  const columns = await BoardColumn.destroy({where:{boardId:board.id}})

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


