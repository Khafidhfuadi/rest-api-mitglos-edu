const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/roleModels");
const User = require("../models/userModels");
const crypto = require("crypto");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes: ["name"],
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      include: {
        model: Role,
        attributes: ["name"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      nama_depan: user.nama_depan,
      nama_belakang: user.nama_belakang,

      email: user.email,
      role: user.role.name,
      is_verified: user.is_verified,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (email, confirmationLink) => {
  console.log("Sending confirmation email to:", email);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "edumitglos@gmail.com",
        pass: "hhxo jpde rdlp sjnk",
      },
    });

    await transporter.sendMail({
      from: "edumitglos@gmail.com",
      to: email,
      subject: "Email Confirmation",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
      
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        /**
         * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
         */
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
        /**
         * Avoid browser level font resizing.
         * 1. Windows Mobile
         * 2. iOS / OSX
         */
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }
        /**
         * Remove extra space added to tables and cells in Outlook.
         */
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
        /**
         * Better fluid images in Internet Explorer.
         */
        img {
          -ms-interpolation-mode: bicubic;
        }
        /**
         * Remove blue links for iOS devices.
         */
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        /**
         * Fix centering issues in Android 4.4.
         */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        /**
         * Collapse table borders to avoid space between cells.
         */
        table {
          border-collapse: collapse !important;
        }
        a {
          color: #1a82e2;
        }
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
        </style>
      
      </head>
      <body style="background-color: #e9ecef;">
      
        <!-- start preheader -->
        <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
          A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
        </div>
        <!-- end preheader -->
      
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
      
          <!-- start logo -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px;">
                    <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                      <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end logo -->
      
          <!-- start hero -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end hero -->
      
          <!-- start copy block -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start button -->
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                <a href="${confirmationLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Konfirmasi Email</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end button -->
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                    <p style="margin: 0;"><a href="${confirmationLink}" target="_blank">${confirmationLink}</a></p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                    <p style="margin: 0;">Cheers,<br> Paste</p>
                  </td>
                </tr>
                <!-- end copy -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
      
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start permission -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end permission -->
      
                <!-- start unsubscribe -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
                    <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                  </td>
                </tr>
                <!-- end unsubscribe -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
      
        </table>
        <!-- end body -->
      
      </body>
      </html>
      `,
    });

    console.log("Email sent");
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    const { nama_depan, nama_belakang, email, password, role_id } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a confirmation token
    const confirmationToken = crypto.randomBytes(20).toString("hex");
    const utcDate = new Date();
    const tokenExpiry =
      new Date(utcDate.getTime() + 8 * 60 * 60 * 1000) + 3600000; // Token expires in 1 hour

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with confirmation token and expiry
    const user = await User.create({
      nama_depan,
      nama_belakang,
      email,
      password: hashedPassword,
      role_id,
      confirmationToken,
      tokenExpiry,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send confirmation email
    const confirmationLink = `${process.env.BASE_URL}/confirm-email?token=${confirmationToken}`;
    await sendConfirmationEmail(email, confirmationLink);

    res
      .status(201)
      .json({ message: "User registered. Check your email for confirmation." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["name"],
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Akun Tidak Ditemukan. Harap Buat Akun Terlebih Dahulu",
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Email atau Password Salah" });
    }

    if (!user.is_verified) {
      return res.status(400).json({
        message:
          "Harap Konfirmasi Email Kamu Terlebih Dahulu. Silahkan Cek Inbox Mail.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.nama_depan,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//check user exist by email param
const checkUserExist = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const confirmEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user by the confirmation token
    const user = await User.findOne({
      where: { confirmationToken: token },
    });

    if (user) {
      if (user.is_verified) {
        return res.redirect(`${process.env.CLIENT_URL}/auth?status=verified`);
      } else {
        return res.redirect(
          `${process.env.CLIENT_URL}/auth?status=invalid-token`
        );
      }
    }

    // Check if the token has expired
    const utcDate = new Date();
    const now = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

    if (now > user.tokenExpiry) {
      // resend confirmation email
      const confirmationLink = `${process.env.BASE_URL}/confirm-email?token=${user.confirmationToken}`;
      await sendConfirmationEmail(user.email, confirmationLink);

      return res.redirect(`${process.env.CLIENT_URL}/expire-token`);
    }

    // Update the user's status to marked as verified
    await user.update({
      is_verified: true,
      confirmationToken: null,
      tokenExpiry: null,
    });

    // Redirect the user to localhost:3000/confirmation-success
    res.redirect(`${process.env.CLIENT_URL}/success-token`);
  } catch (error) {
    console.error("Error confirming email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update user
const updateUserName = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_depan, nama_belakang } = req.body;

    const user = await User.findOne({
      where: { id },
      include: {
        model: Role,
        attributes: ["name"],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      nama_depan,
      nama_belakang,
    });

    res.status(200).json({
      user: {
        id: user.id,
        name: user.nama_depan,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update email and resend confirmation email
const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a confirmation token
    const confirmationToken = crypto.randomBytes(20).toString("hex");
    const utcDate = new Date();
    const tokenExpiry =
      new Date(utcDate.getTime() + 8 * 60 * 60 * 1000) + 3600000; // Token expires in 1 hour

    await user.update({
      email,
      confirmationToken,
      tokenExpiry,
      is_verified: 0, // Set is_verified column to 0
    });

    // Send confirmation email
    const confirmationLink = `${process.env.BASE_URL}/confirm-email?token=${confirmationToken}`;
    await sendConfirmationEmail(email, confirmationLink);

    res.status(200).json({
      message:
        "Email Berhasil diubah. Silahkan cek mail box untuk verifikasi email kamu",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  checkUserExist,
  confirmEmail,
  updateUserName,
  updateEmail,
};
