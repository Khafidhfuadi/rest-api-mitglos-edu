// authController.js

const User = require("../models/userModels");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const passwordResetToken = crypto.randomBytes(20).toString("hex");
    const tokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Update user with the password reset token and expiry
    await user.update({ passwordResetToken, tokenExpiry });

    // Send password reset email
    const resetLink = `${process.env.CLIENT_URL}/reset/${passwordResetToken}`;
    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({
      message:
        "Bila email ada, maka email untuk mengubah password akan dikirim ke email yang Anda masukkan",
    });
    console.log("Email sent");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the user by the password reset token
    const user = await User.findOne({ where: { passwordResetToken: token } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Kesalahan atau Token Password kadaluwarsa" });
    }

    // Check if the token has expired
    const now = Date.now();
    if (now > user.tokenExpiry) {
      return res
        .status(400)
        .json({ message: "Link Sudah Tidak Berlaku. Silahkan Ajukan Ulang" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and reset the token fields
    await user.update({
      password: hashedPassword,
      passwordResetToken: null,
      tokenExpiry: null,
    });

    res
      .status(200)
      .json({ message: "Sukses Mengubah Password. Silahkan Login Kembali" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// authController.js

const sendPasswordResetEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    host: "smpt.gmail.com",
    service: "gmail",
    post: 587,
    secure: true,
    auth: {
      user: "edumitglos@gmail.com",
      pass: "hhxo jpde rdlp sjnk",
    },
  });

  const mailOptions = {
    from: "edumitglos@gmail.com",
    to: email,
    subject: "Mitglos Edu Password Reset",
    text: `Anda telah melakukan permintaan untuk mereset password Akun Mitglos Edu Anda. Untuk melanjutkan prosesnya. Silahkan mengikuti Link Ini ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  forgotPassword,
  resetPassword,
  sendPasswordResetEmail,
};
