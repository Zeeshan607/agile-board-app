import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJwt } from "../utils/Jwt.js";

export const AuthenticateUser=(req, res, next)=>{
    console.log('auth Middleware working');
    // console.log(req.cookies)
    const {token}= req.cookies;
    if(!token) throw new UnauthenticatedError('Authentication invalid')

    try{
        const {userId, role, email}= verifyJwt(token);
        req.user={userId, role, email}; // now these user details will be available in every authenticated request after login.

    }catch(err){
        throw new UnauthenticatedError('Authentication invalid')
    }
    next()
}