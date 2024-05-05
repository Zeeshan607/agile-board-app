
import { Model, DataTypes, ENUM } from "sequelize";
import sequelize from "../db.js";
import User from "./UserModel.js";



const Workspace =sequelize.define('Workspace',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
    }, 
    title:{
      type:DataTypes.STRING,
      allowNull:false,
    
    },
    createdBy:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'users',
        key:'id'
      }
    },
    is_active:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
      unique: {
        args: [true],
        msg: 'Only one workspace can be active at a time!'
     }
    },
    visibility:{
      type:DataTypes.ENUM('private', 'public'),
      defaultValue:"private",
    }

  });






export default Workspace;