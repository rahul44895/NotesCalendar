const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("UserSchema", UserSchema);
