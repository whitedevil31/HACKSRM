const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TravelPost = require("./travelSchema");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
    },
    bio: { type: String, required: true },

    age: { type: Number, required: true, trime: true },
    gender: { type: String, required: true, trime: true, lowercase: true },

    tokens: [{ token: { type: String, required: true } }],
    pictures: { type: Buffer },
  },
  { timestamps: true }
);

userSchema.virtual(
  "travel",
  {
    // any name is fine
    ref: "TravelPost",
    localField: "_id",
    foreignField: "owner",
  },
  {
    ref: "TravelPost",
    localField: "name",
    foreignField: "ownerName",
  },
  {
    ref: "TravelPost",
    localField: "age",
    foreignField: "ownerAge",
  },
  { ref: "TravelPost", localField: "gender", foreignField: "ownerGender" },
  { ref: "TravelPost", localField: "bio", foreignField: "ownerBio" }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.picture;
  return userObject;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
