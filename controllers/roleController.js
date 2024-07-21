import StatusCodes from "http-status-codes";
// import Role from "../app/__old/__Role.js";

class RoleController {
  constructor() {}

  // async index(req, res) {
  //   const roles = await Role.findAll();
  //   res.status(StatusCodes.OK).json({ roles: roles });
  // }

  // async getRolesPermissions(req, res) {
  //   const { role_id } = req.params;
  //   const roleWithPermissions = await Role.findById({
  //     where: { id: role_id },
  //     include: ["Permissions"],
  //   });
  //   res
  //     .status(StatusCodes.OK)
  //     .json({ role_with_permissions: roleWithPermissions });
  // }
}

export default new RoleController();
