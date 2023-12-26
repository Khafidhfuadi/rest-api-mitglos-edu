const path = require("path");
const Mentor = require("../models/mentorModels");

const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll();
    if (!mentors) throw new Error("mentors not found");
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const multer = require("multer");

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
}).single("profile_pict");

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

// create
const createMentor = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        const mentor = new Mentor({
          ...req.body,
          profile_pict: req.file ? req.file.filename : null,
        });
        await mentor.save();
        res.status(201).json({
          message: "mentor created successfully",
          mentor: mentor,
          img_url: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update
const updateMentor = async (req, res) => {
  try {
    const { nama_lengkap, position, linkedin, profile_pict } = req.body;

    const [updated] = await Mentor.update(
      {
        nama_lengkap,
        position,
        linkedin,
        profile_pict,
      },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedMentor = await Mentor.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        mentor: updatedMentor,
        message: "Mentor successfully updated",
      });
    } else {
      throw new Error("Mentor not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete
const deleteMentor = async (req, res) => {
  try {
    const deletedMentor = await Mentor.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Mentor successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
};
