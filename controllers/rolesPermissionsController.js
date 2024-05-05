import StatusCodes from 'http-status-codes';
import Role from '../models/Role.js';

class RolesPermissionsController{

constructor(){}


async attachPermissionToRole(req, res){


    res.status(StatusCodes.OK).json({msg:"permission attached"});
}

async dettachPermissionFromRole(req, res){


    res.status(StatusCodes.OK).json({msg:"permission attached"});
}





}

export default new RolesPermissionsController();