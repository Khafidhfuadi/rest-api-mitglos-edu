const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db-config");
const router = require("./routes");
const User = require("./models/userModels");
const Role = require("./models/roleModels");
const Kategori = require("./models/kategoriModels");
const Product = require("./models/productModels");
const Mentor = require("./models/mentorModels");
const detailProduct = require("./models/detailProductModels");
const Transaksi = require("./models/transaksiModels");

//dotenv
require("dotenv").config();

// const router = require("./routes/index");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

async function connectToDb() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    // await Role.sync();
    await User.sync();
    // await Kategori.sync();
    // await Mentor.sync();
    // await Product.sync();
    await Transaksi.sync();
    await detailProduct.sync();
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

connectToDb();

app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "FROM API." });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
