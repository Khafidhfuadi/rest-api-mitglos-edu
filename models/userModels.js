const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/db-config");
const Role = require("./roleModels");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
    nama_depan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_belakang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rememberToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { as: "user", foreignKey: "role_id" });

module.exports = User;

// // Create an admin user
// (async () => {
//   const adminRole = await Role.findOne({ where: { name: "admin" } });
//   await User.create({
//     role_id: adminRole.id,
//     nama_depan: "John",
//     nama_belakang: "Doe",
//     email: "johndoe@admin.com",
//     password: "password123",
//   });
// })();

// // Create a regular user
// (async () => {
//   const userRole = await Role.findOne({ where: { name: "user" } });
//   await User.create({
//     role_id: userRole.id,
//     nama_depan: "Jane",
//     nama_belakang: "Doe",
//     email: "janedoe@gmail.com",
//     password: "password456",
//   });
// })();
