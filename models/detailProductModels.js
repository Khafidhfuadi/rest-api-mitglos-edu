const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/db-config");
const Product = require("./productModels");
const Mentor = require("./mentorModels");

const DetailProduct = db.define(
  "detail_product",
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
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
        key: "id",
      },
    },
    tentang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

DetailProduct.belongsTo(Mentor, { foreignKey: "mentor_id" });
Mentor.hasMany(DetailProduct, {
  as: "detail_product",
  foreignKey: "mentor_id",
});

DetailProduct.belongsTo(Product, { foreignKey: "product_id" });
Product.hasOne(DetailProduct, {
  as: "detail_product",
  foreignKey: "product_id",
});

module.exports = DetailProduct;
