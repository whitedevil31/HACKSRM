const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const auth = require("../auth");
const multer = require("multer");
const sharp = require("sharp");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    console.log(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
    console.log(e);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});
router.post(
  "/users/me/pictures",
  auth,
  upload.single("pictures"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.pictures = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/users/:id/pictures", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.pictures) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.pictures);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
