const mongoose = require("mongoose");

//Notes Schema
const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    required:true
  },
});

const Notes = mongoose.model("notes", noteSchema);
module.exports = Notes;
