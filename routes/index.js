const { forgotPassword, resetPassword } = require("../controllers/Auth");
const {
  deleteDetailProduct,
  updateDetailProduct,
  createDetailProduct,
} = require("../controllers/DetailProduct");
const {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} = require("../controllers/Mentor");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailProduct,
} = require("../controllers/Product");
const {
  getAllTransaksi,
  getTransaksiById,
  createTransaksi,
  updateTransaksi,
} = require("../controllers/Transaksi");
const {
  getUsers,
  login,
  register,
  getUserById,
  checkUserExist,
  confirmEmail,
  updateUserName,
  updateEmail,
} = require("../controllers/User");
const { verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();

router.get("/api/user/check", checkUserExist);
router.get("/api/user", verifyToken, getUsers);
router.get("/api/user/:id", verifyToken, getUserById);
// updateUserName,
router.put("/api/user/name/:id", verifyToken, updateUserName);
// updateEmail,
router.put("/api/user/email/:id", verifyToken, updateEmail);

router.post("/api/login", login);
router.post("/api/register", register);

router.get("/api/product", getProduct);
router.get("/api/product/:id", getDetailProduct);
router.post("/api/product", verifyToken, createProduct);
router.put("/api/product/:id", verifyToken, updateProduct);
router.delete("/api/product/:id", verifyToken, deleteProduct);

router.get("/api/detail-product", getDetailProduct);
router.get("/api/detail-product/:id", getDetailProduct);
router.post("/api/detail-product/:id", verifyToken, createDetailProduct);
router.put("/api/detail-product/:id", verifyToken, updateDetailProduct);
router.delete("/api/detail-product/:id", verifyToken, deleteDetailProduct);

router.get("/api/mentor", verifyToken, getMentors);
router.post("/api/mentor", verifyToken, createMentor);
router.put("/api/mentor/:id", verifyToken, updateMentor);
router.delete("/api/mentor/:id", verifyToken, deleteMentor);

router.get("/api/transaction", verifyToken, getAllTransaksi);
router.get("/api/transaction/:id", verifyToken, getTransaksiById);
router.post("/api/transaction", verifyToken, createTransaksi);
router.put("/api/transaction/:id", verifyToken, updateTransaksi);

router.get("/confirm-email", confirmEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
