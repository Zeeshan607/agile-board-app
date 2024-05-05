
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
    visibility:{
      type:DataTypes.ENUM('private', 'public'),
      defaultValue:"private",
    }

  });

export default Workspace;