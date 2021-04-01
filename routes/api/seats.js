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

const Seat = require("../../models/Seat");

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

  Seat.find({ room: req.params.id })
    .populate({
      path: "room",
      populate: {
        path: "institution",
      },
    })
    // .populate("institution", ["name"])
    .then((seats) => {
      if (!seats) {
        errors.noroom = "There are no seats";
        return res.status(404).json(errors);
      }
      return res.json(seats);
    })
    .catch((err) => res.status(404).json({ seat: "There are no seats" }));
});

router.get("/:id", (req, res) => {
  Seat.findById(req.params.id)
    .then((seat) => res.json(seat))
    .catch((err) =>
      res.status(404).json({ noroomfound: "No seat found with that ID" })
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
    const seatsFields = {};
    seatsFields.room = req.params.id;
    if (req.body.row) seatsFields.row = req.body.row;
    if (req.body.place) seatsFields.place = req.body.place;

    Seat.findOne({ row: seatsFields.row, place: seatsFields.place }).then(
      (seat) => {
        if (seat) {
          // Update
          Seat.findOneAndUpdate(
            { room: seatsFields.room },
            { $set: seatsFields },
            { new: true }
          ).then((seat) => res.json(seat));
        } else {
          // Create

          // Check if name exists
          Seat.findOne({
            row: seatsFields.row,
            place: seatsFields.place,
          }).then((seat) => {
            if (seat) {
              errors.room = "That name already exists";
              res.status(400).json(errors);
            }

            // Save Room
            new Seat(seatsFields).save().then((seat) => res.json(seat));
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
      Seat.findById(req.params.id)
        .then((seat) => {
          // Check for institution owner
          // if (meal.user.toString() !== req.user.id) {
          //   return res
          //     .status(401)
          //     .json({ notauthorized: "User not authorized" });
          // }

          // Delete
          seat.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ seatnotfound: "No seat found" })
        );
    });
  }
);

module.exports = router;
