const path = require("path");
const Kategori = require("../models/kategoriModels");
const Product = require("../models/productModels");

// CREATE
const multer = require("multer");
const DetailProduct = require("../models/detailProductModels");
const Mentor = require("../models/mentorModels");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("thumbnail_img");

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

exports.createProduct = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        const product = new Product({
          ...req.body,
          thumbnail_img: req.file ? req.file.filename : null,
        });
        await product.save();
        res.status(201).json({
          message: "Product created successfully",
          product: product,
          img_url: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
        });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ

exports.getProduct = async (req, res) => {
  try {
    const { product_status } = req.query;

    const whereClause = {};
    if (product_status !== undefined) {
      whereClause.product_status = product_status === "true"; // Convert to boolean
    }

    const products = await Product.findAll({
      where: whereClause,
      include: {
        model: Kategori,
        attributes: ["name"],
      },
    });

    if (!products || products.length === 0) {
      throw new Error(
        `No products found with product_status = ${product_status}`
      );
    }

    // Extract thumbnail_img URLs from products
    const productsWithThumbnails = products.map((product) => {
      return {
        ...product.toJSON(),
        thumbnail_img_url: `${process.env.BASE_URL}/${product.thumbnail_img}`, // Replace YOUR_BASE_URL with the actual base URL for your images
      };
    });

    res.json({
      products: productsWithThumbnails,
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// DETAIL
exports.getDetailProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: DetailProduct,
          attributes: ["tentang", "topik"],
          as: "detail_product",
          include: {
            model: Mentor,
            as: "mentor",
            attributes: [
              "nama_lengkap",
              "position",
              "linkedin",
              "profile_pict",
            ],
          },
        },
        {
          model: Kategori,
          attributes: ["name"],
        },
      ],
    });

    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);

    if (!product) throw new Error("Product not found");
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    if (!product) throw new Error("Product not found");
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
