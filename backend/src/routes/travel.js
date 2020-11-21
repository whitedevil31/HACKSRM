const express = require("express");
const Travel = require("../model/travelSchema");
const router = express.Router();
const auth = require("../auth");

router.post("/travel", auth, async (req, res) => {
  const travelPost = new Travel({
    ...req.body,
  });

  try {
    await travelPost.save();
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

module.exports = router;
