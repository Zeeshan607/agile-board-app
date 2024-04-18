
import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; //sequalize instance



const BoardColumn = sequelize.define('BoardColumn', {
    // Define model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
       type: DataTypes.STRING,
       allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    boardId:{
        type:DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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



export default BoardColumn;
