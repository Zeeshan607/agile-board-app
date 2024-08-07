import User from "../models/UserModel.js";
import { hashMake } from "../utils/helpers.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

class UserController {

constructor(){}


async index(req, res){
    const users=await User.findAll({where:{id:req.user.userId}});
    res.status(StatusCodes.OK).json({'users':users })
}



async getCurrectUser(req, res){
    const user=await User.findOne({where:{id:req.user.userId}});
    res.status(StatusCodes.OK).json({'user':user })
}

async set_last_active_workspace(req, res){
    const {wsId}=req.body;
    try{
        
        // const user=await User.findOne({where:{id:req.user.userId}});
        // await user.update({last_active_workspace:wsId})
        
        await User.update({last_active_workspace:wsId},{where:{id:req.user.userId}});
    }catch(err){
        throw new BadRequestError(err) ;
    }
    res.status(StatusCodes.OK).json({'msg':"Workspace activated successfully" })

}


}
export default new UserController(); 