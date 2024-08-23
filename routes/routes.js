import express from "express";
const Route= express.Router();
import boardController from '.././controllers/boardController.js';
import UserController from '.././controllers/userController.js';
import AuthController from "../controllers/authController.js";
import { ValidateUser, ValidateUserCredentials } from "../middleware/validationMiddleware.js";
import { AuthenticateUser } from "../middleware/AuthenticateUserMiddleware.js";
import AuthRoutes from "./protectedRoutes.js";
// Define your routes

    Route.post('/auth/register',ValidateUser, AuthController.register);
    Route.post('/auth/login',ValidateUserCredentials, AuthController.login);
    Route.use('/dashboard',AuthenticateUser, AuthRoutes)
   Route.get('/auth/logout',AuthController.logout);
   
// Route.use('/uploads', express.static('uploads'));
// Add more routes as needed

export default Route;