import User from "../models/UserModel.js";
import { comparePassword } from "../utils/helpers.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { createJwt } from "../utils/Jwt.js";
import { StatusCodes } from "http-status-codes";
import config from "../config/default.js";
import Board from "../models/BoardModel.js";
import { hashMake } from "../utils/helpers.js";
// import Role from "../app/__old/__Role.js";
import Workspace from "../models/workspace.js";

async function isExistingUser(email) {
  const user = await User.findOne({ where: { email: email } });
  return user ? true : false;
}

class AuthController {
  constructor() {}

  // register function
  async register(req, res) {
    //  console.log(this.hello)
    // const isFirstAccount = (await User.count()) === 0;
    // const isExisting=await isExistingUser(req.body.email);

    // req.body.role_id = isFirstAccount && !isExisting ? '1' : '3';

    const hashedPass = await hashMake(req.body.password);
    req.body.password = hashedPass;

    req.body.workspace = { title: "Agile-Workspace", admin: 1 };

    const user = await User.create(req.body, {
      include: [{ model: Workspace, as: "workspace" }],
    });
    if (!user)
      throw new BadRequestError("OOPs! something went wrong. please try again");

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Account Created successfully" });
  }

  // login function
  async login(req, res) {
    // console.log(req.body)
    const user = await User.findOne({ where: { email: req.body.email } });
    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));

    if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

    // console.log(user);
    let token = createJwt({
      userId: user.id,
      email: user.email,
      name: user.username,
      last_active_workspace:user.last_active_workspace,
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
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out" });
  }
}

export default new AuthController();
