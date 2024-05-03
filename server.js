import 'express-async-errors';
import express from "express";
import cors from 'cors';
import  config  from './config/default.js';
import morgan from 'morgan';
import mongoos from "mongoose";
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import cookieParser from 'cookie-parser';
import  sequelize from "./db.js"




const app = express();
// const mongo_uri = config.mongodb_uri;



// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());


if(config.node_env ==="development"){
  app.use(morgan("dev"))
}
// Define your routes here
import Route  from './routes/routes.js';
app.use('/api/v1/', Route);


// Test urls
// app.get("/",(req,res)=>{
// res.send("working live....");
// });
// app.post("/api/v1/test",(req,res)=>{
//   console.log(req.body);
//   const { name } = req.body;
//   res.json({ msg: `hello ${name}` });
//   });


//  middleware to check for invalid request errors
  app.use('*',(req, res)=>{
    return res.status(404).json({message:"404 Resource not found"})
  });
  // middleware to check for errors by controllers, this itself will be valid request
  app.use(errorHandlerMiddleware);



// Create a MongoClient with a MongoClientOptions object to set the Stable API version


sequelize.sync({ force: false })// Set force to true to drop existing tables and recreate them
    .then(() => {
        console.log('Database synchronized successfully');
        app.listen(config.port, async () => {
          // await mongoos.connect(config.mongodb_uri);
          console.log(`Server is running on port ${config.port} `);
        });
    }).catch((err) => {
        // console.error('Error synchronizing database:', error);
        console.error('Error: '+ err);
        process.exit(1);
    });


// try{
// // Start the server

// }catch(err){
//   console.log('Error: '+ err);
//   process.exit(1);
// }
