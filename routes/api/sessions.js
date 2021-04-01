const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load User model
const Session = require("../../models/Session");

const Film = require("../../models/Film");
// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Session Works" }));

// @route   GET api/companyprofile/all
// @desc    Get all companyprofiles
// @access  Public
router.get("/all/:id", (req, res) => {
  const errors = {};

  Session.find({ room: req.params.id })
    .populate({
      path: "room",
      populate: {
        path: "institution",
      },
    })
    .then((sessions) => {
      if (!sessions) {
        errors.nosession = "There are no sessions";
        return res.status(404).json(errors);
      }
      return res.json(sessions);
    })
    .catch((err) => res.status(404).json({ session: "There are no sessions" }));
});

router.get("/:id", (req, res) => {
  Session.findById(req.params.id)
    .then((session) => res.json(session))
    .catch((err) =>
      res.status(404).json({ nosessionfound: "No room found with that ID" })
    );
});

// @route   POST api/companyprofile
// @desc    Create or edit company companyprofile
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //   const { errors, isValid } = validateCompanyProfileInput(req.body);
    //   // Check Validation
    //   if (!isValid) {
    //     // Return any errors with 400 status
    //     return res.status(400).json(errors);
    //   }

    const errors = {};
    // Get fields
    const sessionsFields = {};
    sessionsFields.institution = req.params.id;
    if (req.body.name) sessionsFields.name = req.body.name;
    if (req.body.duration) sessionsFields.duration = req.body.duration;
    if (req.body.description) sessionsFields.description = req.body.description;
    if (req.body.film) sessionsFields.film = req.body.film;

    Session.findOne({
      name: sessionsFields.name,
      institution: req.params.id,
    }).then((session) => {
      if (session) {
        // Update
        Session.findOneAndUpdate(
          { name: sessionsFields.name },
          { $set: sessionsFields },
          { new: true }
        ).then((session) => res.json(session));
      } else {
        // Create

        // Check if name exists
        Session.findOne({
          name: sessionsFields.name,
          institution: req.params.id,
        }).then((session) => {
          if (session) {
            errors.name = "That name already exists";
            res.status(400).json(errors);
          }

          // Save Room
          new Session(sessionsFields)
            .save()
            .then((session) => res.json(session));
        });
      }
    });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CompanyProfile.findOne({ company: req.user.id }).then((companyprofile) => {
      Session.findById(req.params.id)
        .then((session) => {
          // Check for institution owner
          // if (meal.user.toString() !== req.user.id) {
          //   return res
          //     .status(401)
          //     .json({ notauthorized: "User not authorized" });
          // }

          // Delete
          session.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ sessionnotfound: "No session found" })
        );
    });
  }
);

module.exports = router;
