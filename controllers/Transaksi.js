// CRUD

const Transaksi = require("../models/transaksiModels");

// CREATE
exports.createTransaksi = function (req, res) {
  Transaksi.create({
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    status: req.body.status,
  })
    .then((result) => {
      res.status(201).json({
        message: "Transaksi created successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
};

// READ
const User = require("../models/userModels");
const Product = require("../models/productModels");
const Kategori = require("../models/kategoriModels");

exports.getAllTransaksi = function (req, res) {
  // Check if user_id is present in the request parameters
  if (req.query.user_id && req.query.product_id) {
    Transaksi.findAll({
      where: { user_id: req.query.user_id, product_id: req.query.product_id },
      include: [
        {
          model: User,
          attributes: ["nama_depan", "nama_belakang", "email"],
        },
        {
          model: Product,
          attributes: ["judul"],
          include: {
            model: Kategori,
            attributes: ["name", "id"],
          },
        },
      ],
    })
      .then((result) => {
        // if result is empty return false else return true
        const isTransaksiExist = result.length > 0;
        const status = result?.[0].status;
        const id = result?.[0].id;
        console.log(result);
        res.status(200).json({
          id,
          isTransaksiExist,
          status,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  } else if (req.query.status && req.query.user_id) {
    Transaksi.findAll({
      where: { status: req.query.status, user_id: req.query.user_id },
      include: [
        {
          model: Product,
          attributes: ["judul", "periode"],
          include: {
            model: Kategori,
            attributes: ["name", "id"],
          },
        },
      ],
    })
      .then((result) => {
        res.status(200).json({
          message:
            "Get all transaksi for status: " +
            req.query.status +
            " and user_id: " +
            req.query.user_id,
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  } else if (req.query.user_id) {
    Transaksi.findAll({
      where: { user_id: req.query.user_id },
      include: [
        {
          model: User,
          attributes: ["nama_depan", "nama_belakang", "email"],
        },
        {
          model: Product,
          attributes: ["judul", "periode", "kategori_id"],
          include: {
            model: Kategori,
            attributes: ["name"],
          },
        },
      ],
    })
      .then((result) => {
        res.status(200).json({
          message: "Get all transaksi for user_id: " + req.query.user_id,
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  } else {
    // Perform default actions when user_id is not present
    Transaksi.findAll({
      include: [
        {
          model: User,
          attributes: ["nama_depan", "nama_belakang", "email"],
        },
        {
          model: Product,
          attributes: ["judul"],
          include: {
            model: Kategori,
            attributes: ["name"],
          },
        },
      ],
    })
      .then((result) => {
        res.status(200).json({
          message: "Get all transaksi",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  }
};

exports.getTransaksiById = function (req, res) {
  Transaksi.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Get transaksi by id",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "Transaksi not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
};

// UPDATE
exports.updateTransaksi = function (req, res) {
  Transaksi.update(
    {
      status: req.body.status,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Transaksi updated successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
};

// DELETE

exports.deleteTransaksi = function (req, res) {
  Transaksi.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Transaksi deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Transaksi not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
};
