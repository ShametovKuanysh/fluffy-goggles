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
const Room = require("../../models/Room");

const Institution = require("../../models/Institution");
// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Rooms Works" }));

// @route   GET api/companyprofile/all
// @desc    Get all companyprofiles
// @access  Public
router.get("/all/:id", (req, res) => {
  const errors = {};

  Room.find({ institution: req.params.id })
    .populate("institution", ["name"])
    .then((rooms) => {
      if (!rooms) {
        errors.noroom = "There are no rooms";
        return res.status(404).json(errors);
      }
      return res.json(rooms);
    })
    .catch((err) => res.status(404).json({ room: "There are no rooms" }));
});

router.get("/:id", (req, res) => {
  Room.findById(req.params.id)
    .then((room) => res.json(room))
    .catch((err) =>
      res.status(404).json({ noroomfound: "No room found with that ID" })
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
    const roomsFields = {};
    roomsFields.institution = req.params.id;
    if (req.body.name) roomsFields.name = req.body.name;
    if (req.body.place_number) roomsFields.place_number = req.body.place_number;
    if (req.body.description) roomsFields.description = req.body.description;
    if (req.body.rows) roomsFields.rows = req.body.rows;
    if (req.body.row_places) roomsFields.row_places = req.body.row_places;

    Room.findOne({ name: roomsFields.name, institution: req.params.id }).then(
      (room) => {
        if (room) {
          // Update
          Room.findOneAndUpdate(
            { name: roomsFields.name },
            { $set: roomsFields },
            { new: true }
          ).then((room) => res.json(room));
        } else {
          // Create

          // Check if name exists
          Room.findOne({
            name: roomsFields.name,
            institution: req.params.id,
          }).then((room) => {
            if (room) {
              errors.name = "That name already exists";
              res.status(400).json(errors);
            }

            // Save Room
            new Room(roomsFields).save().then((room) => res.json(room));
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
      Room.findById(req.params.id)
        .then((room) => {
          // Check for institution owner
          // if (meal.user.toString() !== req.user.id) {
          //   return res
          //     .status(401)
          //     .json({ notauthorized: "User not authorized" });
          // }

          // Delete
          room.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ roomnotfound: "No room found" })
        );
    });
  }
);

module.exports = router;
