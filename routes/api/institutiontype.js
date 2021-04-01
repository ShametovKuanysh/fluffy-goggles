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
const InstitutionType = require("../../models/InstitutionType");

// @route GET api/institutiontypes/test
// @desc Tests institutiontypes route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Institutions Works" }));

// @route   GET api/institutiontypes
// @desc    Get institutiontypes
// @access  Public
router.get("/", (req, res) => {
  InstitutionType.find()
    .sort({ date: -1 })
    .then((institutiontypes) => res.json(institutiontypes))
    .catch((err) =>
      res
        .status(404)
        .json({ noinstitutiontypesfound: "No institutiontypes found" })
    );
});

// @route   GET api/institutiontypes/:id
// @desc    Get institutiontype by id
// @access  Public
router.get("/:id", (req, res) => {
  InstitutionType.findById(req.params.id)
    .then((institutiontype) => res.json(institutiontype))
    .catch((err) =>
      res.status(404).json({
        noinstitutiontypefound: "No institutiontype found with that ID",
      })
    );
});

// @route   POST api/institutiontypes
// @desc    Create institutiontypes
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateInstitutionInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }
    const errors = {};

    const newInstitutionType = new InstitutionType({
      name: req.body.name,
      avatar: req.body.avatar,
      description: req.body.description,
      user: req.user.id,
    });

    newInstitutionType
      .save()
      .then((institutiontype) => res.json(institutiontype));
  }
);

// @route   DELETE api/institutiontypes/:id
// @desc    Delete institutiontypes
// @access  Private
router.delete("/:id", (req, res) => {
  InstitutionType.findById(req.params.id)
    .then((post) => {
      // Delete
      institutiontype.remove().then(() => res.json({ success: true }));
    })
    .catch((err) =>
      res
        .status(404)
        .json({ institutiontypenotfound: "No institutiontype found" })
    );
});

module.exports = router;
