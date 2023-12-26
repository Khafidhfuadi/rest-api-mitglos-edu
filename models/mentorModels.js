const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/db-config");
// const Role = require("./roleModels");

const Mentor = db.define(
  "mentor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pict: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// User.belongsTo(Role, { foreignKey: "role_id" });

module.exports = Mentor;
