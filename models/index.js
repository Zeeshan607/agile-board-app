import  sequelize from "../db.js"
import {v1 as uuidv1, v4 as uuidv4} from 'uuid';
import { hashMake } from "../utils/helpers.js";
import User from "./UserModel.js";
import Workspace from "./Workspace.js";
import Board from "./BoardModel.js";
import UserWorkspace from "./UserWorkspace.js";
import BoardColumn from "./BoardColumnModel.js";
import Task from "./TaskModel.js";
import SubTask from "./SubTask.js";
import TaskDiscussion from "./TaskDiscussion.js";
import {trunOffForeignKeyCheckAndTruncateTable,checkIfTableExists} from "../utils/helpers.js";
// Define any associations here
// For example: User.hasMany(Post);

// ---------------------------------------

// UserModel.js
// User.belongsToMany(Workspace, {
//   onDelete: "CASCADE",
//   through: UserWorkspace,
//   foreignKey: "user_id",
//   constraints: false,
//   as: "workspaces",
// });

// User.hasMany(Workspace,{
//   onDelete: "CASCADE",
//   foreignKey: "createdBy",
//   constraints: false,
//   as: "workspaces",
// });

// User.hasMany(Workspace, {
//   foreignKey: 'createdBy',
//   as: 'ownWorkspaces'
// });

// // Many-to-Many relationship for shared workspaces
// Workspace.belongsToMany(User, {
//   onDelete: "RESTRICT",
//   through: UserWorkspace,
//   foreignKey: "workspace_id",
//   constraints: false,
//   as: "shared",
// });

// // Add this relationship to access the creator
// Workspace.belongsTo(User, {
//   foreignKey: 'createdBy',
//   as: 'user'
// });

// One-to-Many relationship for user's own workspaces
User.hasMany(Workspace, {
  foreignKey: 'createdBy',
  as: 'ownedWorkspaces'
});
Workspace.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

// Many-to-Many relationship for shared workspaces
User.belongsToMany(Workspace, {
  through: UserWorkspace,
  foreignKey: 'user_id',
  as: 'sharedWorkspaces'
});
Workspace.belongsToMany(User, {
  through: UserWorkspace,
  foreignKey: 'workspace_id',
  as: 'usersWithAccess'
});





// boardModel.js
Workspace.hasMany(Board,{
    onDelete:"CASCADE",
    foreignKey:'workspace_id',
    as:'boards'
  })
Board.belongsTo(Workspace,{
    onDelete:"RESTRICT",
    foreignKey:'workspace_id',
    as:'workspace',
    constraints:false
  })


// TaskModel.js
BoardColumn.hasMany(Task,{foreignKey:{ allowNull: false,name:"column_id"},onDelete: 'CASCADE',as:"Tasks"});
Task.belongsTo(BoardColumn,{as:'columns',onDelete: 'RESTRICT',foreignKey:{ allowNull: false,name:"column_id"}});
Task.belongsTo(Board,{as:'boards',onDelete: 'RESTRICT',constraints:false,foreignKey:{ allowNull: false,name:"board_id"}});
Board.hasMany(Task,{
    onDelete:"CASCADE",
    foreignKey:'board_id',
    as:'tasks'
})

// 

Task.belongsTo(User,{as:"assigned_users",onDelete: 'RESTRICT', onUpdate:"RESTRICT",constraints:false,foreignKey:{ allowNull: true,name:"assigned_to"}});
User.hasMany(Task,{
  onDelete:"RESTRICT",
  onUpdate:"RESTRICT",
  foreignKey:{name:'assigned_to',allowNull:true},
  as:'assigned_tasks' });


Task.hasMany(SubTask,{
  onDelete:"CASCADE",
  onUpdate:"RESTRICT",
  foreignKey:{name:'task_id',allowNull:true},
  as:'sub_tasks' 
})


Task.hasMany(TaskDiscussion,{
  onDelete:"CASCADE",
  onUpdate:"RESTRICT",
  foreignKey:{name:'task_id',allowNull:true},
  as:'discussions' 
})



const dbRefresh=false;
const modelSeeding=false;
const uid1=uuidv4();
const uid2=uuidv4();
const uid3=uuidv4();
const uid4=uuidv4();
const uid5=uuidv4();
const uid6=uuidv4();
const uid7=uuidv4();
const uid8=uuidv4();


const initModels = async () => {

  try {

    await syncModels();

      if(modelSeeding){
        try {
          await seedModels();
          await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
          console.log('Models synchronized and seeded successfully.');
        } catch (seedingError) {
          console.error('Error while seeding models:', seedingError);
        }
      }


  } catch (syncError) {
    console.error('Error synchronizing models:', syncError);
  }
 
};










const syncModels = async () => {
  // Disable foreign key checks
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  // Drop tables in reverse order
  // await Task.drop();
  // await BoardColumn.drop();
  // await Board.drop();
  // await UserWorkspace.drop();
  // await Workspace.drop();
  // await User.drop();

  // Sync tables  
  await Workspace.sync({ force:  dbRefresh });
  await User.sync({ force: dbRefresh });
  await UserWorkspace.sync({ force: dbRefresh });
  await Board.sync({ force: dbRefresh });
  await BoardColumn.sync({ force: dbRefresh });
  await Task.sync({ force: dbRefresh });
  await SubTask.sync({ force: dbRefresh });
  await TaskDiscussion.sync({ force: dbRefresh });

  // Enable foreign key checks
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  console.log('All models synchronized successfully');
};



// function seeding model tables
const seedModels= async()=>{
 
try{
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
console.log('Seeding Database...')
// queries for default data insertion

// USER
if(await checkIfTableExists('users')){
  const userCount = await User.count();
  if (userCount === 0) {
    try {
      User.bulkCreate([
        {
          id: 1,
          username: "Zeeshan",
          email: "zeeshanawan1998@gmail.com",
          password: await hashMake("Shani-1998"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: "M-Zeeshan",
          email: "muhammadzeeshan5420@gmail.com",
          password: await hashMake("Shani-1998"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      // console.log("failed to insert default users into db error: " + err);
      throw new Error('failed to insert default users into db error: '+err);
    }
  }

}



// workspace
if( await checkIfTableExists("workspaces")){
  const workspace= await Workspace.count();
if(workspace==0){
  try{
    await Workspace.bulkCreate([
      {id:uid1,title:"Agile Workspace-1",slug:"agile-workspace-1",visibility:'private', createdBy:1,is_active:true,createdAt:new Date(), updatedAt:new Date()},
      {id:uid2,title:"Agile Workspace-2",slug:"agile-workspace-2",visibility:'private', createdBy:2,is_active:false,createdAt:new Date(), updatedAt:new Date()},
    ])
  }catch(err){
    // console.log("failed to insert default workspace data into db error: " + err);
    throw new Error('failed to insert default workspace data into db error: '+err);
  }
 
} 

}



// add users shared workspace link via usersworkspaces table
if((await checkIfTableExists('users')) && (await checkIfTableExists('workspaces')) && (await checkIfTableExists('userworkspaces')) ){
  
      const userCount=await User.count();
      const workspaceCount= await Workspace.count();
      const uw_count=await UserWorkspace.count();

      if(userCount <=2 && workspaceCount <=2 && uw_count === 0){
        try{
          const user=await User.findByPk(2);
          const workspace=await Workspace.findOne({where:{id:uid1}});
            if(!workspace || !user){
              throw new Error('User or Workspace not found');
            }
            await UserWorkspace.create(
              {id:1,workspace_id:workspace.id,user_id:user.id,createdAt:new Date(), updatedAt:new Date()}
            )

        }catch(err){
          throw new Error(err);
        }

      }

}









if(await checkIfTableExists("boards")){

  const bCount=await Board.count();
  if(bCount===0){

    try{
      const ws1=  await Workspace.findOne({where:{id:uid1}});
      const ws2=  await Workspace.findOne({where:{id:uid2}});
      if(!ws1 || !ws2){
        throw new Error("Workspace does not exist to create board")
      }
      await Board.bulkCreate([
        {id:1,name:'Mobile Ecommerce store',slug:"mobile-ecommerce-store", workspace_id:ws1.id, description:"An Ecommerce web store for Mobile phones.",createdAt:new Date(), updatedAt:new Date()},
        {id:2,name:'Staton Studio Marketing',slug:"staton-studio-marketing", workspace_id:ws2.id, description:"An online profile for Marketing agency.",createdAt:new Date(), updatedAt:new Date()}
      ])
    }catch(err){
      // console.log("failed to insert default Board data into db error: " + err);
      throw new Error('failed to insert default Board data into db error: '+err);
    }

    
  }

}




// boardColumn
if(await checkIfTableExists("boardcolumns")){
const bcCount=await BoardColumn.count();
if(bcCount===0){

  try{
    await BoardColumn.bulkCreate([
      {id:uid3,name:"To Do",description:"List of all tasks that we have to do.",boardId:1,order:1,createdAt:new Date(), updatedAt:new Date()},
      {id:uid4,name:"In Progress",description:"All tasks that are under development",boardId:1,order:2,createdAt:new Date(), updatedAt:new Date()},
      {id:uid5,name:"Completed",description:"All completed tasks",boardId:1,order:3,createdAt:new Date(), updatedAt:new Date()},
      {id:uid6,name:"To Do",description:"List of all tasks that we have to do.",boardId:2,order:1,createdAt:new Date(), updatedAt:new Date()},
      {id:uid7,name:"In Progress",description:"All tasks that are under development",boardId:2,order:2,createdAt:new Date(), updatedAt:new Date()},
      {id:uid8,name:"Completed",description:"All completed tasks",boardId:2,order:3,createdAt:new Date(), updatedAt:new Date()},
    ])
  }catch(err){

    // console.log(" " + err);
    throw new Error('failed to insert default BoardColumn data into db error:: '+err);
  }
   
  } 

}




// Taskmodel.js
if(await checkIfTableExists("tasks")){
const TaskCount=await Task.count();
if(TaskCount ===0){
  //  await trunOffForeignKeyCheckAndTruncateTable("tasks");
        try{
          const user=await User.findByPk(2);
     
          if (!user) {
            throw new Error('User with id 2 does not exist.');
          }
          const column1=await BoardColumn.findOne({where:{id:uid3}});
          const column2=await BoardColumn.findOne({where:{id:uid6}});
   
          if (!column1 || !column2) {
            throw new Error('column with given names does not exist.');
          }
          //       console.log("task user "+user.id);
          // console.log("task col-1 "+column1.id);
          // console.log("task col-2 "+column2.id);
          if(user && column1 && column2){
              Task.bulkCreate([
                    {id:1, title:'Create about page',description:"page should have seo mechanism", priority:1,due_date:null,assigned_to:user.id, column_id:column1.id,board_id:1, createdAt:new Date(), updatedAt:new Date()},
                    {id:2, title:'Create Shop page',description:"page should have seo mechanism", priority:2,due_date:null,assigned_to:user.id, column_id:column2.id,board_id:2,  createdAt:new Date(), updatedAt:new Date()},
                ])
          }
                
        }catch(err){
          throw new Error('failed to insert default Tasks into db error: '+err);
            // console.log("failed to insert default Tasks into db error: "+err);
        }

}
}





























}catch(err){
    throw new Error(err);
}



}

export  { initModels };