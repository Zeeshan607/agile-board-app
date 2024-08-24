import sequelize from "../db.js";
import { DataTypes } from "sequelize";
// import Workspace from "./workspace.js";
// import User from "./UserModel.js";


const UserWorkspace=  sequelize.define('UserWorkspace',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    workspace_id:{
        type:DataTypes.UUIDV4,
        allowNull:false,
        references:{
            model:'Workspace',
            key:"id"
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'User',
            key:'id',
        }
    },
   
    is_shared:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    }
})

export default UserWorkspace;