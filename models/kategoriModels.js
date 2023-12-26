const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/db-config");

const Kategori = db.define(
  "kategori",
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
  },
  {
    freezeTableName: true,
  }
);

module.exports = Kategori;
