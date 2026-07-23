import User from "../models/UserModel.js";
import { comparePassword } from "../utils/helpers.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  InternalServerError,
} from "../errors/customErrors.js";
import { createJwt } from "../utils/Jwt.js";
import { StatusCodes } from "http-status-codes";
import config from "../config/default.js";
import Board from "../models/BoardModel.js";
import { hashMake } from "../utils/helpers.js";
import Workspace from "../models/Workspace.js";
import Invitation from "../models/Invitation.js";
import UserWorkspace from "../models/UserWorkspace.js";

async function isExistingUser(email) {
  const user = await User.findOne({ where: { email: email } });
  return user ? true : false;
}

class AuthController {
  constructor() {}

  // register function
  async register(req, res) {
    const hashedPass = await hashMake(req.body.password);
    req.body.password = hashedPass;

    const {username, email, password}=req.body;
// create new user
    const newlyCreatedUser=await User.create({'username':username, 'email':email, 'password':password});
//get newly created user
    const user =await User.findByPk(newlyCreatedUser.id);
    // if system is unable to find the newly created user means there is somthing wrong with user creation of terminate the registration process.
    if(!user){
      throw new InternalServerError('Oops! something went wrong');
    }
    // console.log(user);
     const defaultWorkspace= await Workspace.create({'title':"Default Agile Workspace","createdBy":user.id,'is_default':1});
     // make the auto-created workspace the user's active one so they land somewhere useful right after signup
     await user.update({'last_active_workspace':defaultWorkspace.id});

      const invite=await Invitation.findOne({where:{'invited_user_email':user.email, 'status':'accepted'}});

      if(invite){
        const workspace=await Workspace.findByPk(invite.workspace_id);
        if(workspace){
          await UserWorkspace.create({'workspace_id':workspace.id,'user_id':user.id, 'is_shared':1});
        }
      }

    // log the user in immediately, mirroring login(), so registration doesn't dead-end back at the login screen
    let token = createJwt({
      userId: user.id,
      email: user.email,
      name: user.username,
      image: user.image,
      last_active_workspace: user.last_active_workspace,
      last_active_board: user.last_active_board,
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: config.node_env === "production",
    });

    return res
      .status(StatusCodes.OK)
      .json({ token, msg: "Account Created successfully" });
  }

  // login function
  async login(req, res) {
    // console.log(req.body)
    const user = await User.findOne({ where: { email: req.body.email } });

    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

    const invite=await Invitation.findOne({where:{'invited_user_email':user.email, 'status':'accepted'}});
    if(invite){
      // console.log('inside invite if conditions')
      const workspace=await Workspace.findByPk(invite.workspace_id);
      const userWorkspaceConnection= await UserWorkspace.findOne({where:{'workspace_id':workspace.id,'user_id':user.id, 'is_shared':1}});
      if(!userWorkspaceConnection){
        if(invite && workspace){
          await UserWorkspace.create({'workspace_id':workspace.id,'user_id':user.id, 'is_shared':1});
         }
      }
    }
 
   

    let token = createJwt({
      userId: user.id,
      email: user.email,
      name: user.username,
      image:user.image,
      last_active_workspace:user.last_active_workspace,
      last_active_board:user.last_active_board,
      // is_tour_done:user.is_tour_done
    });

    const oneDay = 1000 * 60 * 60 * 24; //converting one Day into milliseconds

    //set token cookie for user login
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay), //cookie will exprire in one day
      secure: config.node_env === "production",
    });

    res.status(StatusCodes.OK).json({ token, msg: "User login successfully" });
  }

  logout(req, res) {
    res.cookie("token", "logout", {
      httpOnly: true,
      // expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === 'production', // Set to true in production to use Secure flag
      sameSite: 'strict', // Prevents the cookie from being sent with cross-site requests
      expires: new Date(0),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out" });
    
  }


  


}

export default new AuthController();
