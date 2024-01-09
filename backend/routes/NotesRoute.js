const express = require("express");
const decodeToken = require("../middlewares/decodeToken");
const router = express.Router();
const NotesSchema = require("../schemas/NotesSchema");
const { body, validationResult } = require("express-validator");

router.post(
  "/addNote/:date",
  decodeToken,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json({ msg: validate.array() });
    }
    let note = new NotesSchema({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      date: req.params.date,
    });
    const savedNote = await note.save();
    res.status(200).json({ msg: "Note Saved Successfully", savedNote });
  }
);

router.put("/updateNote/:id", decodeToken, async (req, res) => {
  let note = await NotesSchema.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ msg: "Note not found" });
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Not allowed" });
  }
  let newNote = {};
  let { title, description, tag } = req.body;
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;
  note = await NotesSchema.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.status(200).json({ msg: "Note updated Successfully", note });
});

router.delete("/deleteNote/:id", decodeToken, async (req, res) => {
  let note = await NotesSchema.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ msg: "Note not found" });
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Not allowed" });
  }
  note = await NotesSchema.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Note Deleted Successfully" });
});

router.post("/fetchNotes/:date", decodeToken, async (req, res) => {
  let notes = await NotesSchema.find({ user: req.user.id });
  if (!notes) {
    return res.status(400).json({ msg: "No notes found for this user" });
  }
  if (req.params.date == "all") {
    return res.status(200).json({ notes });
  }
  let dateNotes = [];
  for (let index = 0; index < notes.length; index++) {
    if (notes[index].date == req.params.date) {
      dateNotes.push(notes[index]);
    }
  }
  if (dateNotes.length == 0) {
    return res.status(400).json({ msg: "No notes found for this date" });
  }
  res.status(200).json({ dateNotes });
});
module.exports = router;
