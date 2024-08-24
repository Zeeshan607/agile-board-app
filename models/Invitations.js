import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Invitation = sequelize.define("Invitation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  workspace_id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: "Workspace",
      key: "id",
    },
  },
  invited_user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "declined"),
    defaultValue: "pending",
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
export default Invitation;
