import User from "../models/UserModel.js";
import { hashMake } from "../utils/helpers.js";
import { StatusCodes } from "http-status-codes";


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


}
export default new UserController(); 