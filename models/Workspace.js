
import { Model, DataTypes, ENUM } from "sequelize";
import sequelize from "../db.js";
import User from "./UserModel.js";
import {v1 as uuidv1} from 'uuid';
import Board from "./BoardModel.js";

const Workspace =sequelize.define('Workspace',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
    }, 
    title:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      set(value){
      const slug = value.split(' ').join('-');
        this.setDataValue('slug',slug.toLowerCase());
        this.setDataValue('title',value)
      }
    },
    slug:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    createdBy:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'users',
        key:'id'
      }
    },
 
    visibility:{
      type:DataTypes.ENUM('private', 'public'),
      defaultValue:"private",
    }

  });


//   Workspace.sync().then(() => {
//     return Board.sync();
// }).then(() => {
//     console.log('Models synchronized with the database');
// }).catch(error => {
//     console.error('Error synchronizing models with the database:', error);
// });


  // const workspace= await Workspace.count();
  // if(workspace==0){
    // try{
    // await sequelize.transaction(function(t) {
    //   var options = { raw: true, transaction: t }
    //   sequelize
    //     .query('SET FOREIGN_KEY_CHECKS = 0', null, options)
    //     .then(function() {
    //       return sequelize.query('truncate table workspaces', null, options)
    //     })
    //     .then(function() {
    //       return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
    //     })
    //     .then(function() {
    //       return t.commit()
    //     })
    // })
    // }catch(err){
    //   console.log("Workspace model Transaction error: "+err);
    // }
  //     await Workspace.bulkCreate([
  //       {id:uuidv1(),title:"Agile-workspac-1",visibility:'private', createdBy:2,is_active:true,createdAt:new Date(), updatedAt:new Date()},
  //       {id:uuidv1(),title:"Agile-workspace-2",visibility:'private', createdBy:2,is_active:false,createdAt:new Date(), updatedAt:new Date()},
  //     ])
  // } 
  


  



export default Workspace;