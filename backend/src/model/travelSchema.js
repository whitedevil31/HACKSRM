const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: { type: Date },
  endDate: { type: Date },
  places: { type: String },
  days: { type: String },
  Expected: { type: String },
  Budget: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  ownerName: { type: String, ref: "Users", required: true },
  ownerAge: { type: Number, ref: "Users", required: true },
  ownerGender: { type: String, ref: "Users", required: true },
  ownerBio: { type: String, ref: "Users", required: true },
});

const Travel = mongoose.model("Travel", travelSchema);
module.exports = Travel;
