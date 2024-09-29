import Sequelize from 'sequelize';



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.MYSQL_HOST, 
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
