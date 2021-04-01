const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SeatSchema = new Schema({
  row: {
    type: Number,
  },
  place: {
    type: Number,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
  },
});

module.exports = Seat = mongoose.model("seats", SeatSchema);
