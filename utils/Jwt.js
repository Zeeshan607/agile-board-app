import jwt from "jsonwebtoken";
import config from "../config/default.js";

export const createJwt = (payload)=>{
    const token=jwt.sign(payload,config.JWT_secret,{
        expiresIn:config.JWT_expires_at,
    });
    return  token;
}

export const verifyJwt = (token)=>{
    const decoded= jwt.verify(token, config.JWT_secret);
    return decoded;
}