const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create Schema
const InstitutionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
  },
  usual_cost: {
    type: String,
  },
  address: {
    type: String,
  },
  count_place: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "companies",
  },
  institutiontype: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Institution = mongoose.model(
  "institutions",
  InstitutionSchema
);
