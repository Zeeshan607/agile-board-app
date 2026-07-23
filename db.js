import 'dotenv/config';
import Sequelize from 'sequelize';

// db.js must load its own env vars rather than relying on some other module
// (config/default.js) having already called dotenv.config() first — that
// only happened to work for server.js because of import order; any script
// that imports db.js directly (commands/db-seed.js, commands/db-refresh.mjs)
// otherwise saw DB_NAME/DB_USER/DB_PASS as undefined, which made mysql2 fall
// back to an empty-string username and fail with "Access denied for user
// ''@'localhost'".

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST, 
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
          logging:(err)=>{
              console.log(err)
          }
    });

    try{
      sequelize.authenticate();
      console.log('Database connected successfully');
    }catch(err){
      console.error('Database Connectivity Error: '+err);

    }
    
export default sequelize;
