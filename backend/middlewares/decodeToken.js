require("dotenv").config();
const JWT = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.REACT_APP_JWT_SECRET_KEY;
const decodeToken = (req, res, next) => {
  const token = req.header("authToken");
  if (!token) {
    return res.status(400).json({ msg: "Invalid Token" });
  }
  try {
    const data = JWT.verify(token, JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};
module.exports = decodeToken;
