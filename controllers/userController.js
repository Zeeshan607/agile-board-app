import User from "../models/UserModel.js";
import { hashMake } from "../utils/helpers.js";

class UserController {

constructor(){}

async getCurrectUser(req, res){
    const user=await User.findOne({where:{id:req.user.userId}});
    res.status(StatusCodes.OK).json({'user':user })
}


}
export default new UserController(); 