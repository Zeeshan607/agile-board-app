 // Assuming you have a Sequelize instance set up
 import sequelize from '../db.js';
import {DataTypes} from 'sequelize';


const SubTask = sequelize.define('SubTask', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    is_completed:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false,

    },
    task_id:{
        type: DataTypes.INTEGER,
        allowNull:true,
        
    },
 
});

export default SubTask ;