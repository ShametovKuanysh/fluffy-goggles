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
const Film = require("../../models/Film");

const Institution = require("../../models/Institution");
// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Film Works" }));

// @route   GET api/companyprofile/all
// @desc    Get all companyprofiles
// @access  Public
router.get("/all/:id", (req, res) => {
  const errors = {};

  Film.find({ institution: req.params.id })
    .populate("institution", ["name"])
    .then((films) => {
      if (!films) {
        errors.nofilm = "There are no films";
        return res.status(404).json(errors);
      }
      return res.json(films);
    })
    .catch((err) => res.status(404).json({ film: "There are no films" }));
});

router.get("/:id", (req, res) => {
  Film.findById(req.params.id)
    .then((film) => res.json(film))
    .catch((err) =>
      res.status(404).json({ nofilmfound: "No room found with that ID" })
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
    const filmsFields = {};
    filmsFields.institution = req.params.id;
    if (req.body.name) filmsFields.name = req.body.name;
    if (req.body.duration) filmsFields.duration = req.body.duration;
    if (req.body.description) filmsFields.description = req.body.description;

    Film.findOne({ name: filmsFields.name, institution: req.params.id }).then(
      (film) => {
        if (film) {
          // Update
          Film.findOneAndUpdate(
            { name: filmsFields.name },
            { $set: filmsFields },
            { new: true }
          ).then((film) => res.json(film));
        } else {
          // Create

          // Check if name exists
          Film.findOne({
            name: filmsFields.name,
            institution: req.params.id,
          }).then((film) => {
            if (film) {
              errors.name = "That name already exists";
              res.status(400).json(errors);
            }

            // Save Room
            new Film(filmsFields).save().then((film) => res.json(film));
          });
        }
      }
    );
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CompanyProfile.findOne({ company: req.user.id }).then((companyprofile) => {
      Film.findById(req.params.id)
        .then((film) => {
          // Check for institution owner
          // if (meal.user.toString() !== req.user.id) {
          //   return res
          //     .status(401)
          //     .json({ notauthorized: "User not authorized" });
          // }

          // Delete
          film.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ filmnotfound: "No film found" })
        );
    });
  }
);

module.exports = router;
