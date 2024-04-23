
import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; // Assuming you have a Sequelize instance set up
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
        allowNull:false,
    },
    due_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    assigned_to:{
            type:DataTypes.INTEGER,
            allowNull:true,
            // references:{
            //     model:User,
            //     key:'id',
            // }
    },
    column_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:BoardColumn,
            key:'id',
        },
       

    }
});
//example of model relation defination in squalize model
// User.hasMany(Post, { onDelete: 'CASCADE' });
// Post.belongsTo(User);

BoardColumn.hasMany(Task,{foreignKey:"column_id",onDelete: 'CASCADE',as:"Tasks"});
Task.belongsTo(BoardColumn,{as:'Columns'});


export default Task;