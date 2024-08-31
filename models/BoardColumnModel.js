
import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; //sequalize instance
import Workspace from './Workspace.js';
import {v1 as uuidv1} from "uuid";


const BoardColumn = sequelize.define('BoardColumn', {
    // Define model attributes
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique:true,
    },
    name:{
       type: DataTypes.STRING,
       allowNull:false
    },
    description:{
        type:DataTypes.TEXT('long'),
        allowNull:false
    },
    boardId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        reference:{
            model:'Boards',
            key:'id'
        }
    },
    order:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    is_deleted:{
        type:DataTypes.DATE,
        default:null
    },
});


// const bcCount=await BoardColumn.count();
// if(bcCount===0 ){
//     try{
//     await sequelize.transaction(function(t) {
//       var options = { raw: true, transaction: t }
//       sequelize
//         .query('SET FOREIGN_KEY_CHECKS = 0', null, options)
//         .then(function() {
//           return sequelize.query("truncate table boardcolumns", null, options);
//         })
//         .then(function() {
//           return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
//         })
//         .then(function() {
//           return t.commit()
//         })
//     })
//     }catch(err){
//       console.log("BoardColumn model Transaction error: "+err);
//     }
//     // BoardColumn.sync({force:true})
//       await BoardColumn.bulkCreate([
//         {id:uuidv1(),name:"To Do",description:"List of all tasks that we have to do.",boardId:1,order:1,createdAt:new Date(), updatedAt:new Date()},
//         {id:uuidv1(),name:"In Progress",description:"All tasks that are under development",boardId:1,order:2,createdAt:new Date(), updatedAt:new Date()},
//         {id:uuidv1(),name:"Completed",description:"All completed tasks",boardId:1,order:3,createdAt:new Date(), updatedAt:new Date()},
//         {id:uuidv1(),name:"To Do",description:"List of all tasks that we have to do.",boardId:2,order:1,createdAt:new Date(), updatedAt:new Date()},
//         {id:uuidv1(),name:"In Progress",description:"All tasks that are under development",boardId:2,order:2,createdAt:new Date(), updatedAt:new Date()},
//         {id:uuidv1(),name:"Completed",description:"All completed tasks",boardId:2,order:3,createdAt:new Date(), updatedAt:new Date()},
//       ])
//   } 




export default BoardColumn;
