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
const Meal = require("../../models/Meal");

const Institution = require("../../models/Institution");
// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Meals Works" }));

// @route   GET api/companyprofile/all
// @desc    Get all companyprofiles
// @access  Public
router.get("/all/:id", (req, res) => {
  const errors = {};

  Meal.find({ institution: req.params.id })
    .populate("institution", ["name"])
    .then((meals) => {
      if (!meals) {
        errors.noprofile = "There are no meals";
        return res.status(404).json(errors);
      }
      return res.json(meals);
    })
    .catch((err) => res.status(404).json({ meal: "There are no meals" }));
});

router.get("/:id", (req, res) => {
  Meal.findById(req.params.id)
    .then((meal) => res.json(meal))
    .catch((err) =>
      res.status(404).json({ nomealfound: "No meal found with that ID" })
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
    const mealsFields = {};
    mealsFields.institution = req.params.id;
    if (req.body.cost) mealsFields.cost = req.body.cost;
    if (req.body.name) mealsFields.name = req.body.name;
    if (req.body.time) mealsFields.time = req.body.time;

    Meal.findOne({ name: mealsFields.name }).then((meal) => {
      if (meal) {
        // Update
        Meal.findOneAndUpdate(
          { name: mealsFields.name },
          { $set: mealsFields },
          { new: true }
        ).then((meal) => res.json(meal));
      } else {
        // Create

        // Check if name exists
        Meal.findOne({ name: mealsFields.name }).then((meal) => {
          if (meal) {
            errors.name = "That name already exists";
            res.status(400).json(errors);
          }

          // Save Meal
          new Meal(mealsFields).save().then((meal) => res.json(meal));
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
      Meal.findById(req.params.id)
        .then((meal) => {
          // Check for institution owner
          // if (meal.user.toString() !== req.user.id) {
          //   return res
          //     .status(401)
          //     .json({ notauthorized: "User not authorized" });
          // }

          // Delete
          meal.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ mealnotfound: "No meal found" })
        );
    });
  }
);

module.exports = router;
