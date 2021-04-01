const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  time: {
    type: Date,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
  },
  film: {
    type: Schema.Types.ObjectId,
    ref: "films",
  },
});

module.exports = Session = mongoose.model("sessions ", SessionSchema);
