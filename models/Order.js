const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  cost: {
    type: Number,
    required: true,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "institutions",
  },
  places: {
    type: [String],
    required: true,
  },
  order_meal: {
    type: [Schema.Types.ObjectId],
    ref: "meals",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
