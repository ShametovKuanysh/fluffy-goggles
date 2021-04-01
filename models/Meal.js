const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MealSchema = new Schema({
  cost: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "institutions",
  },
  time: {
    type: Number,
  },
});

module.exports = Meal = mongoose.model("meals", MealSchema);
