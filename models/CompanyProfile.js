const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CompanyProfileSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "companies",
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CompanyProfile = mongoose.model(
  "companyprofiles",
  CompanyProfileSchema
);
