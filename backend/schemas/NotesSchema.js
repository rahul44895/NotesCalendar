const mongoose = require("mongoose");
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },
  title: { type: String },
  description: { type: String },
  tag: { type: String },
  date: { type: String },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NotesSchema", NotesSchema);
