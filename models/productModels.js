const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/db-config");
const Kategori = require("./kategoriModels");

const Product = db.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kuota: {
      //integer
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ringkasan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pertemuan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tempat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kategori_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kategori,
        key: "id",
      },
    },
    product_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);
// const DetailProduct = require("./detailProductModels");

// DetailProduct.belongsTo(Product, { foreignKey: "product_id" });
// Product.hasOne(DetailProduct, {
//   as: "detail_product",
//   foreignKey: "product_id",
// });

Product.belongsTo(Kategori, { foreignKey: "kategori_id" });
Kategori.hasMany(Product, {
  as: "detail_product",
  foreignKey: "kategori_id",
});

module.exports = Product;
