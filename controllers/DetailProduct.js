//CRUD Detail Product

const DetailProduct = require("../models/detailProductModels");

// CREATE
exports.createDetailProduct = async (req, res) => {
  try {
    const { tentang, topik, mentor_id } = req.body;
    const { id } = req.params;

    const detailProduct = await DetailProduct.create({
      tentang,
      topik,
      mentor_id,
      product_id: id,
    });

    res.json(detailProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ
exports.getDetailProduct = async (req, res) => {
  try {
    const detailProduct = await DetailProduct.findAll({
      include: [
        {
          model: Product,
          attributes: ["title", "thumbnail", "price", "description"],
        },
        {
          model: Mentor,
          attributes: ["nama_lengkap", "position", "linkedin", "profile_pict"],
        },
      ],
    });

    res.json(detailProduct);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// UPDATE
exports.updateDetailProduct = async (req, res) => {
  try {
    const { tentang, topik, mentor_id, product_id } = req.body;

    const detailProduct = await DetailProduct.update(
      {
        tentang,
        topik,
        mentor_id,
        product_id,
      },
      { where: { id: req.params.id } }
    );

    res.json(detailProduct);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// DELETE
exports.deleteDetailProduct = async (req, res) => {
  try {
    const detailProduct = await DetailProduct.findByPk(req.params.id);
    await detailProduct.destroy();

    if (!detailProduct) throw new Error("Detail Product not found");
    res.json(detailProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Path: routes/index.js
