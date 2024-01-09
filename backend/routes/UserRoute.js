const express = require("express");
const UserSchema = require("../schemas/UserSchema");
const router = express.Router();
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const JWT = require("jsonwebtoken");
const decodeToken = require("../middlewares/decodeToken");
const JWT_SECRET_KEY = process.env.REACT_APP_JWT_SECRET_KEY;
const bcrypt = require("bcryptjs");

router.post(
  "/signup",
  [
    body("username").isLength({ min: 1 }),
    body("password").isLength({ min: 8 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json({ error: validate.array() });
    }
    let user = await UserSchema.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({ msg: "Email already registered" });
    }
    user = new UserSchema({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    });
    user.save();
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = JWT.sign(data, JWT_SECRET_KEY);
    res.status(200).json({ msg: "User Created Successfully", authToken });
  }
);

router.post("/login", async (req, res) => {
  let user = await UserSchema.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ msg: "Enter valid credentials" });
  }
  const passwordCompare = await bcrypt.compareSync(req.body.password, user.password);
  if (!passwordCompare) {
    return res.status(404).json({ msg: "Enter valid credentials" });
  }
  const data = {
    user: {
      id: user.id,
    },
  };
  const authToken = JWT.sign(data, JWT_SECRET_KEY);
  res.status(200).json({ msg: "Login Successfully", authToken, username:user.username });
});

router.post("/fetchUser", decodeToken, async (req, res) => {
  let user = await UserSchema.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized access is not allowed" });
  }
  res.status(200).json({ user });
});
module.exports = router;
