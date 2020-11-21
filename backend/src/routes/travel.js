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

module.exports = router;
