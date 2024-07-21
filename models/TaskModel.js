
 // Assuming you have a Sequelize instance set up
 import sequelize from '../db.js';
import {DataTypes} from 'sequelize';
import Board from './BoardModel.js'
import BoardColumn from './BoardColumnModel.js';

// import User from './UserModel.js';


const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    
    },
    priority:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    due_date:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    assigned_to:{
            type:DataTypes.INTEGER,
            allowNull:true,
            // references:{
            //     model:'User',
            //     key:'id',
            // }
    },
    column_id:{
        type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
        allowNull:true,
        // references:{
        //     model:'BoardColumn',
        //     key:'id',
        // }
    },
    board_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        // references:{
        //     model:'Board',
        //     key:'id',
        // }
       }
});
//example of model relation defination in squalize model









export default Task;