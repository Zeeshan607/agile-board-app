import bcrypt from "bcryptjs";
import sequelize from "../db.js";

export const hashMake = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
};

export const comparePassword = async (password, hashedPassword) => {
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched;
};

export const checkIfTableExists = async (tableName) => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();

    return tables.includes(tableName);
  } catch (error) {
    console.error("Error checking if table exists:", error);
    return false;
  }
};

export const trunOffForeignKeyCheckAndTruncateTable = async (tableName) => {
  try {
    await sequelize.transaction(function (t) {
      var options = { raw: true, transaction: t };
      sequelize
        .query("SET FOREIGN_KEY_CHECKS = 0", null, options)
        .then(function () {
          return sequelize.query(`truncate table ${tableName}`, null, options);
        })
        .then(function () {
          return sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null, options);
        })
        .then(function () {
          return t.commit();
        });
    });
  } catch (err) {
    console.log(tableName + " model Transaction error: " + err);
  }
};
