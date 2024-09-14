import express from "express";
const Route = express.Router();
import boardController from ".././controllers/boardController.js";
import UserController from ".././controllers/userController.js";
import AuthController from "../controllers/authController.js";
import {
  ValidateUser,
  ValidateUserCredentials,
} from "../middleware/validationMiddleware.js";
import { AuthenticateUser } from "../middleware/AuthenticateUserMiddleware.js";
import AuthRoutes from "./protectedRoutes.js";
import InvitationsHandlingController from "../controllers/web/InvitationsHandlingController.js";
import workspaceController from "../controllers/workspaceController.js";
// Define your routes
Route.post("/auth/register", ValidateUser, AuthController.register);
Route.post("/auth/login", ValidateUserCredentials, AuthController.login);
Route.use("/dashboard", AuthenticateUser, AuthRoutes);


Route.get('/workspace/:id', workspaceController.getById);

Route.post('/accept_invite', InvitationsHandlingController.accept);
Route.post('/decline_invite', InvitationsHandlingController.decline);
Route.get("/invite/get_by_email_and_token/:token/:email",InvitationsHandlingController.getBYTokenAndEmail);
// Route.get(`/join-workspace/:workspace_id?token=:token`,In );



export default Route;
