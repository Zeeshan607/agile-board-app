 
 import dotenv from 'dotenv';
 dotenv.config();

const config={
    "hostname":process.env.HOST_NAME,
    "port": process.env.PORT,
    "node_env":process.env.NODE_ENV,
    // "mongodb_uri":process.env.MONGODB_URI,
    "JWT_secret":process.env.JWT_SECRET_KEY,
    "JWT_expires_at":process.env.JWT_EXPIRY,
    "db_refresh":process.env.DB_REFRESH,
    "gmail_username":process.env.GMAIL_USERNAME,
    "gmail_app_password":process.env.GMAIL_APP_PASSWORD
  }
  export default config;
