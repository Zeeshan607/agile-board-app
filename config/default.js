 
 import dotenv from 'dotenv';
 dotenv.config();

const config={
    "port": process.env.PORT,
    "node_env":process.env.NODE_ENV,
    "mongodb_uri":process.env.MONGODB_URI,
    "JWT_secret":process.env.JWT_SECRET_KEY,
    "JWT_expires_at":process.env.JWT_EXPIRY
  
  }
  export default config;
