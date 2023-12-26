const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/db-config");
const User = require("./userModels");
const Product = require("./productModels");

const Transaksi = db.define(
  "transaksi",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER, // Change to INTEGER
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Transaksi.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Transaksi, { foreignKey: "user_id" });

Transaksi.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Transaksi, { foreignKey: "product_id" });

module.exports = Transaksi;
