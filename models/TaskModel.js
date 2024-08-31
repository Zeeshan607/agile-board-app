
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
        type:DataTypes.TEXT('long'),
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
            references:{
                model:'Users',
                key:'id',
            },
            // onUpdate:"RESTRICT",
            // onDelete:"RESTRICT",
    },
    column_id:{
        type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
        allowNull:true,
        references:{
            model:'BoardColumns',
            key:'id',
        },
        // onUpdate:"RESTRICT",
        // onDelete:"RESTRICT",
    },
    board_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:'Boards',
            key:'id',
        },
        // onUpdate:"RESTRICT",
        // onDelete:"RESTRICT",
       }
});
//example of model relation defination in squalize model









export default Task;