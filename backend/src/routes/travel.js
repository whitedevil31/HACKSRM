const express = require("express");
const Travel = require("../model/travelSchema");
const router = express.Router();
const auth = require("../auth");
const User = require("../model/userSchema");

router.post("/travel", auth, async (req, res) => {
  const travelPost = new Travel({
    ...req.body,
    owner: req.user._id,
    ownerName: req.user.name,
    ownerAge: req.user.age,
    ownerGender: req.user.gender,
    ownerBio: req.user.bio,
  });
  const userPost = req.user._id;

  try {
    await travelPost.save();
    const userData = await User.findById(userPost);

    res.status(201).send(travelPost);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/travel/filter", auth, async (req, res) => {
  try {
    const response = await Travel.find({
      location: req.body.location,
      startDate: { $gte: req.body.startDate, $lte: req.body.endDate },
    });
    res.send(response);
  } catch (e) {
    console.log(e);
  }
});
router.get("/travel/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Travel.findById(id);
    res.send(post);
  } catch (e) {
    console.log(e);
  }
});

router.get("/travel/getProfile/:id", auth, async (req, res) => {
  try {
    const reqId = req.params.id;
    const user = await User.findById(reqId);
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
