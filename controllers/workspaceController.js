import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import Workspace from "../models/Workspace.js";
import Board from "../models/BoardModel.js";
import Task from "../models/TaskModel.js";
import { Op } from "sequelize";
import UserWorkspace from "../models/UserWorkspace.js";
import Invitation from "../models/Invitation.js";
import sequelize from "../db.js";
import { UnauthorizedError } from "../errors/customErrors.js";



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
        // {
        //   model: Board,
        //   as: 'boards',
        //   include: [{ model: Task, as: 'tasks' }]
        // }
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
    if(ws.createdBy !== req.user.userId){
      throw new UnauthorizedError("You are not allowed to rename this workspace. Only the owner can rename it.");
    }
    const updated_ws=await ws.update({'title':title});
    res.status(StatusCodes.OK).json({ workspace:updated_ws});
  }

  async userLeavingWorkspaceAccess(req, res){
    const {user_id, workspace_id}=req.body;
    if(req.user.userId!==user_id){
      return res.status(StatusCodes.BAD_REQUEST).json({'msg':"Action forbidden: you are not authorized to perform this action"});
    }
   try{
    // Wrapped in a transaction so a user's access is never removed unless we can also
    // land them on a valid last_active_workspace (previously this could partially commit
    // then crash if the user owned no other workspace, leaving DB/UI out of sync).
    const nextWorkspace = await sequelize.transaction(async (t) => {
      await UserWorkspace.destroy({where:{"user_id":user_id,"workspace_id":workspace_id}, transaction:t});
      const user=await User.findByPk(user_id, {transaction:t});
      await Invitation.destroy({where:{"invited_user_email":user.email, 'workspace_id':workspace_id}, transaction:t});
      const workspace=await Workspace.findOne({where:{createdBy:user.id}, order: [['createdAt', 'DESC']], transaction:t});

      await user.update({'last_active_workspace': workspace ? workspace.id : null}, {transaction:t});
      return workspace;
    });

    return res.status(StatusCodes.OK).json({'user_created_latest_workspace':nextWorkspace});
   }catch(err){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'msg':'Oops! something went wrong.'})
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'msg':'Oops! something went wrong.'})
     }
  }





}




export default new workspaceController();
