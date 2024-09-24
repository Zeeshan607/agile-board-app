import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import Workspace from "../models/Workspace.js";
import Board from "../models/BoardModel.js";
import Task from "../models/TaskModel.js";
import { Op } from "sequelize";
import UserWorkspace from "../models/UserWorkspace.js";
import Invitation from "../models/Invitation.js";



class workspaceController {
  constructor() {}

  async index(req, res) {
    // get all workspaces to which current user is admin or member
    // const user_workspace = await User.findOne({
    //   where: { id: req.user.userId },
    //   include: [
    //     {
    //       model: Workspace,
    //       as: "ownedWorkspaces",
    //       include: [
    //         {
    //           model: Board,
    //           as: "boards",
    //           include: [{ model: Task, as: "tasks" }],
    //         },
    //       ],
    //     },
    //     {
    //       model: Workspace,
    //       as: "sharedWorkspaces",
    //       include: [
    //         {
    //           model: Board,
    //           as: "boards",
    //           include: [{ model: Task, as: "tasks" }],
    //         },
    //       ],
    //     },
    //   ],
    // });

    // const formated_ws = {};

    // formated_ws["shared"] = user_workspace.sharedWorkspaces;
    // formated_ws["owned"] = user_workspace.ownedWorkspaces;

    const userWorkspaces = await Workspace.findAll({
      where: {
        [Op.or]: [
          { createdBy: req.user.userId },
          { '$usersWithAccess.UserWorkspace.user_id$': req.user.userId }
        ]
      },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username'], // Adjust attributes as necessary
        },
        {
          model: User,
          as: 'usersWithAccess',
          attributes: ['id', 'username'], // Adjust attributes as necessary
          through: {
            attributes: ['is_shared']
          }
        },
        {
          model: Board,
          as: 'boards',
          include: [{ model: Task, as: 'tasks' }]
        }
      ]
    });
    
    // Categorize workspaces
    const formated_ws = {
      owned: [],
      shared: []
    };
    
    userWorkspaces.forEach(ws => {
      if (ws.createdBy === req.user.userId) {
        formated_ws.owned.push(ws);
      } else {
        formated_ws.shared.push(ws);
      }
    });

    res.status(StatusCodes.OK).json({ workspace: formated_ws });
  }

  // ,where:{createdBy:{[Op.ne]:req.user.userId}}
  async getMemebers(req, res) {
    const { id } = req.params;
    const ws = await Workspace.findOne({
      where: { id },
      include: [{ model: User, as: "usersWithAccess" },{model:User, as:'creator'}],
    });
    // console.log(ws);
    res.status(StatusCodes.OK).json({ workspaceWithMembers: ws });
  }

  async getBoards(req, res) {
    const { id } = req.params;
    const ws = await Workspace.findOne({
      where: { id },
      include: [{ model: Board, as: "boards" }],
    });
    // console.log(ws);
    res.status(StatusCodes.OK).json({ boards: ws.boards });
  }
  async getById(req, res) {
    const { id } = req.params;
    const ws = await Workspace.findByPk(id);
    res.status(StatusCodes.OK).json({ workspace: ws });
  }

  async store(req, res){
      const {title}=req.body;
   try {
    const ws = await Workspace.create({
      title: title,
      createdBy: req.user.userId,
    });
    res.status(StatusCodes.OK).json({ workspace: ws });
  } catch (error) {

    // console.log(error.code);
    if (error.name==="SequelizeUniqueConstraintError") {
      // Handle Sequelize validation error
      res.status(StatusCodes.BAD_REQUEST).json({
        type: 'Validation error',
        message: error.errors.map((err) => err.message),
      });
    } else {
      // Handle other types of errors
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        details: error.message,
      });
    }
  }
}

  async update(req, res){
    const {id}=req.params;
    const {title}=req.body;
    const ws = await Workspace.findByPk(id);
    const updated_ws=await ws.update({'title':title});
    res.status(StatusCodes.OK).json({ workspace:updated_ws});
  }

  async userLeavingWorkspaceAccess(req, res){
    const {user_id, workspace_id}=req.body;
    if(req.user.userId!==user_id){
      return res.status(StatusCodes.BAD_REQUEST).json({'error':"Action forbiden: you are not autherize to perform this action"});
    }
   try{
    const userWs=await UserWorkspace.destroy({where:{"user_id":user_id,"workspace_id":workspace_id}});
    const user=await User.findByPk(user_id);
    const removeInvite=await Invitation.destroy({where:{"invited_user_email":user.email, 'workspace_id':workspace_id}});
     const workspace=await Workspace.findOne({where:{createdBy:user.id}, order: [['createdAt', 'DESC']]});

      await user.update({'last_active_workspace':workspace.id});

    return res.status(StatusCodes.OK).json({'user_created_latest_workspace':workspace});
   }catch(err){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'error':'Oops! something went wrong.'})
   }

   

  }
  async removeUserAccessToWorkspace(req, res){
    const {user_id, workspace_id}=req.body;

    try{
      await UserWorkspace.destroy({where:{"user_id":user_id,"workspace_id":workspace_id}});
      const user=await User.findByPk(user_id);
      await Invitation.destroy({where:{"invited_user_email":user.email, 'workspace_id':workspace_id}});
      return res.status(StatusCodes.OK).json({'msg':"Access removed succusfully"})
     }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'error':'Oops! something went wrong.'})
     }
  }





}




export default new workspaceController();
