import 'express-async-errors';
import express from "express";
import cors from 'cors';
import  config  from './config/default.js';
import morgan from 'morgan';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import cookieParser from 'cookie-parser';
import { initModels } from './models/index.js';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import os from 'os';
// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

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

app.use(express.static(__dirname + '/build'));

//  middleware to check for invalid request errors
app.use('*',(req, res)=>{
  return res.status(404).json({message:"404 Resource not found"})
});
// middleware to check for errors by controllers, this itself will be valid request
app.use(errorHandlerMiddleware);

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version


// await sequelize.sync({ force:true })// Set force to true to drop existing tables and recreate them
//     .then(() => {
//         console.log('Database synchronized successfully');
//         app.listen(config.port, async () => {
//           // await mongoos.connect(config.mongodb_uri);
//           console.log(`Server is running on port ${config.port} `);
//         });
//     }).catch((err) => {
//         // console.error('Error synchronizing database:', error);
//         console.error('Error: '+ err);
//         process.exit(1);
//     });

try{

  const server = app.listen(config.port, async () => {
    await initModels();

    const { address, port } = server.address();
    const host = address === '::' ? 'localhost' : address
    console.log('Database synchronized successfully');
    // console.log(`Server is running on host ${hostname}: port ${config.port} `);
    console.log(`Server running at http:// ${host} : ${port} `);
  });

}catch(err){
  console.error('Error: '+ err);
        process.exit(1);
}



