const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load Validation
const validateCompanyProfileInput = require("../../validation/companyprofile");
// const validateExperienceInput = require("../../validation/experience");
// const validateEducationInput = require("../../validation/education");

// Load CompanyProfile Model
const CompanyProfile = require("../../models/CompanyProfile");
// Load Company Model
const Company = require("../../models/Company");

// @route   GET api/companyprofile/test
// @desc    Tests companyprofile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "CompanyProfile Works" }));

// @route   GET api/companyprofile
// @desc    Get current companies companyprofile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    CompanyProfile.findOne({ company: req.user.id })
      .populate("company", ["name"])
      .then((companyprofile) => {
        if (!companyprofile) {
          errors.noprofile = "There is no companyprofile for this company";
          return res.status(404).json(errors);
        }
        res.json(companyprofile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/companyprofile/all
// @desc    Get all companyprofiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  CompanyProfile.find()
    .populate("company", ["name"])
    .then((companyprofiles) => {
      if (!companyprofiles) {
        errors.noprofile = "There are no companyprofiles";
        return res.status(404).json(errors);
      }
      return res.json(companyprofiles);
    })
    .catch((err) =>
      res.status(404).json({ companyprofile: "There are no companyprofiles" })
    );
});

// @route   GET api/companyprofile/handle/:handle
// @desc    Get companyprofile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  CompanyProfile.findOne({ handle: req.params.handle })
    .populate("company", ["name"])
    .then((companyprofile) => {
      if (!companyprofile) {
        errors.noprofile = "There is no companyprofile for this company";
        res.status(404).json(errors);
      }

      res.json(companyprofile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/companyprofile/company/:user_id
// @desc    Get companyprofile by company ID
// @access  Public

router.get("/companies/:user_id", (req, res) => {
  const errors = {};

  CompanyProfile.findOne({ company: req.params.user_id })
    .populate("company", ["name"])
    .then((companyprofile) => {
      if (!companyprofile) {
        errors.noprofile = "There is no companyprofile for this company";
        res.status(404).json(errors);
      }

      res.json(companyprofile);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ companyprofile: "There is no companyprofile for this company" })
    );
});

// @route   POST api/companyprofile
// @desc    Create or edit company companyprofile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCompanyProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const companyprofileFields = {};
    companyprofileFields.company = req.user.id;
    if (req.body.handle) companyprofileFields.handle = req.body.handle;
    if (req.body.website) companyprofileFields.website = req.body.website;
    if (req.body.location) companyprofileFields.location = req.body.location;
    if (req.body.bio) companyprofileFields.bio = req.body.bio;
    if (req.body.status) companyprofileFields.status = req.body.status;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      companyprofileFields.skills = req.body.skills.split(",");
    }

    // Social
    companyprofileFields.social = {};
    if (req.body.youtube)
      companyprofileFields.social.youtube = req.body.youtube;
    if (req.body.twitter)
      companyprofileFields.social.twitter = req.body.twitter;
    if (req.body.facebook)
      companyprofileFields.social.facebook = req.body.facebook;
    if (req.body.instagram)
      companyprofileFields.social.instagram = req.body.instagram;

    CompanyProfile.findOne({ company: req.user.id }).then((companyprofile) => {
      if (companyprofile) {
        // Update
        CompanyProfile.findOneAndUpdate(
          { company: req.user.id },
          { $set: companyprofileFields },
          { new: true }
        ).then((companyprofile) => res.json(companyprofile));
      } else {
        // Create

        // Check if handle exists
        CompanyProfile.findOne({ handle: companyprofileFields.handle }).then(
          (companyprofile) => {
            if (companyprofile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }

            // Save CompanyProfile
            new CompanyProfile(companyprofileFields)
              .save()
              .then((companyprofile) => res.json(companyprofile));
          }
        );
      }
    });
  }
);

// @route   DELETE api/companyprofile/
// @desc    Delete company and companyprofile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CompanyProfile.findOneAndRemove({ company: req.company.id }).then(() => {
      Company.findOneAndRemove({ _id: req.company.id }).then(() =>
        res.json("success")
      );
    });
  }
);

module.exports = router;
