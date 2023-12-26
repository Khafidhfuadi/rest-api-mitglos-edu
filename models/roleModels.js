const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/db-config");

const Role = db.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// Add data records for user and admin
// Role.create({
//   name: "user",
//   description: "Regular user",
// });

// Role.create({
//   name: "admin",
//   description: "Administrator",
// });

module.exports = Role;
