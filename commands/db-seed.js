
// var path=require('path')
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// import process from "node:process";
import sequelize from "../db.js";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
// const currentDir=process.cwd();
// // Resolve the path to helpers.js
// const helpersPath = import.meta.resolve("../utils/helpers.js");

// 
// import { hashMake } from"../utils/helpers.js" ;
const helpers = await import("../utils/helpers.js");

import User from "../models/UserModel.js";
import Workspace from "../models/Workspace.js";
import Board from "../models/BoardModel.js";
import UserWorkspace from "../models/UserWorkspace.js";
import BoardColumn from "../models/BoardColumnModel.js";
import Task from "../models/TaskModel.js";
import SubTask from "../models/SubTask.js";
import TaskDiscussion from "../models/TaskDiscussion.js";
import {
  trunOffForeignKeyCheckAndTruncateTable,
  checkIfTableExists,
} from "../../utils/helpers.js";
import { dirname } from 'node:path';
// import config from "../config/default.js";
// import Invitation from './Invitation.js';

// function seeding model tables
const seedModels = async () => {
  const uid1 = uuidv4();
  const uid2 = uuidv4();
  const uid3 = uuidv4();
  const uid4 = uuidv4();
  const uid5 = uuidv4();
  const uid6 = uuidv4();
  const uid7 = uuidv4();
  const uid8 = uuidv4();

  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    console.log("Seeding Database...");
    // queries for default data insertion

    // USER
    if (await checkIfTableExists("users")) {
      const userCount = await User.count();
      if (userCount === 0) {
        try {
          User.bulkCreate([
            {
              id: 1,
              username: "Zeeshan",
              email: "zeeshanawan1998@gmail.com",
              password: await helpers.hashMake("Shani-1998"),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              username: "M-Zeeshan",
              email: "muhammadzeeshan5420@gmail.com",
              password: await helpers.hashMake("Shani-1998"),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        } catch (err) {
          // console.log("failed to insert default users into db error: " + err);
          throw new Error(
            "failed to insert default users into db error: " + err
          );
        }
      }
    }

    // workspace
    if (await checkIfTableExists("workspaces")) {
      const workspace = await Workspace.count();
      if (workspace == 0) {
        try {
          await Workspace.bulkCreate([
            {
              id: uid1,
              title: "Agile Workspace-1",
              slug: "agile-workspace-1",
              visibility: "private",
              createdBy: 1,
              is_active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: uid2,
              title: "Agile Workspace-2",
              slug: "agile-workspace-2",
              visibility: "private",
              createdBy: 2,
              is_active: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        } catch (err) {
          // console.log("failed to insert default workspace data into db error: " + err);
          throw new Error(
            "failed to insert default workspace data into db error: " + err
          );
        }
      }
    }

    // add users shared workspace link via usersworkspaces table
    if (
      (await checkIfTableExists("users")) &&
      (await checkIfTableExists("workspaces")) &&
      (await checkIfTableExists("userworkspaces"))
    ) {
      const userCount = await User.count();
      const workspaceCount = await Workspace.count();
      const uw_count = await UserWorkspace.count();

      if (userCount <= 2 && workspaceCount <= 2 && uw_count === 0) {
        try {
          const user = await User.findByPk(2);
          const workspace = await Workspace.findOne({ where: { id: uid1 } });
          if (!workspace || !user) {
            throw new Error("User or Workspace not found");
          }
          await UserWorkspace.create({
            id: 1,
            workspace_id: workspace.id,
            user_id: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } catch (err) {
          throw new Error(err);
        }
      }
    }

    if (await checkIfTableExists("boards")) {
      const bCount = await Board.count();
      if (bCount === 0) {
        try {
          const ws1 = await Workspace.findOne({ where: { id: uid1 } });
          const ws2 = await Workspace.findOne({ where: { id: uid2 } });
          if (!ws1 || !ws2) {
            throw new Error("Workspace does not exist to create board");
          }
          await Board.bulkCreate([
            {
              id: 1,
              name: "Mobile Ecommerce store",
              slug: "mobile-ecommerce-store",
              workspace_id: ws1.id,
              description: "An Ecommerce web store for Mobile phones.",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              name: "Staton Studio Marketing",
              slug: "staton-studio-marketing",
              workspace_id: ws2.id,
              description: "An online profile for Marketing agency.",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        } catch (err) {
          // console.log("failed to insert default Board data into db error: " + err);
          throw new Error(
            "failed to insert default Board data into db error: " + err
          );
        }
      }
    }

    // boardColumn
    if (await checkIfTableExists("boardcolumns")) {
      const bcCount = await BoardColumn.count();
      if (bcCount === 0) {
        try {
          await BoardColumn.bulkCreate([
            {
              id: uid3,
              name: "To Do",
              description: "List of all tasks that we have to do.",
              boardId: 1,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: uid4,
              name: "In Progress",
              description: "All tasks that are under development",
              boardId: 1,
              order: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: uid5,
              name: "Completed",
              description: "All completed tasks",
              boardId: 1,
              order: 3,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: uid6,
              name: "To Do",
              description: "List of all tasks that we have to do.",
              boardId: 2,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: uid7,
              name: "In Progress",
              description: "All tasks that are under development",
              boardId: 2,
              order: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: uid8,
              name: "Completed",
              description: "All completed tasks",
              boardId: 2,
              order: 3,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        } catch (err) {
          // console.log(" " + err);
          throw new Error(
            "failed to insert default BoardColumn data into db error:: " + err
          );
        }
      }
    }

    // Taskmodel.js
    if (await checkIfTableExists("tasks")) {
      const TaskCount = await Task.count();
      if (TaskCount === 0) {
        //  await trunOffForeignKeyCheckAndTruncateTable("tasks");
        try {
          const user = await User.findByPk(2);

          if (!user) {
            throw new Error("User with id 2 does not exist.");
          }
          const column1 = await BoardColumn.findOne({ where: { id: uid3 } });
          const column2 = await BoardColumn.findOne({ where: { id: uid6 } });

          if (!column1 || !column2) {
            throw new Error("column with given names does not exist.");
          }
          //       console.log("task user "+user.id);
          // console.log("task col-1 "+column1.id);
          // console.log("task col-2 "+column2.id);
          if (user && column1 && column2) {
            Task.bulkCreate([
              {
                id: 1,
                title: "Create about page",
                description: "page should have seo mechanism",
                priority: 1,
                due_date: null,
                assigned_to: user.id,
                column_id: column1.id,
                board_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 2,
                title: "Create Shop page",
                description: "page should have seo mechanism",
                priority: 2,
                due_date: null,
                assigned_to: user.id,
                column_id: column2.id,
                board_id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]);
          }
        } catch (err) {
          throw new Error(
            "failed to insert default Tasks into db error: " + err
          );
          // console.log("failed to insert default Tasks into db error: "+err);
        }
      }
    }

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (err) {
    throw new Error(err);
  }
};

seedModels()
  .then((resp) => {
    console.log("Models synchronized and seeded successfully.");
  })
  .catch((err) => {
    console.log(err);
  });
