 // Assuming you have a Sequelize instance set up
 import sequelize from '../db.js';
import {DataTypes} from 'sequelize';



const TaskDiscussion = sequelize.define('TaskDiscussion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    task_id:{
        type: DataTypes.INTEGER,
        allowNull:true,
    },
 
});

export default TaskDiscussion ;