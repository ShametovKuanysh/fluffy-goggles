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

// Load Company model
const Company = require("../../models/Company");

// @route GET api/companies/test
// @desc Tests companies route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.get("/", (req, res) => {
  Company.find()
    .sort({ date: -1 })
    .then((companies) => res.json(companies))
    .catch((err) =>
      res.status(404).json({ nousersfound: "No companies found" })
    );
});

// @route POST api/companies/register
// @desc Register company
// @access Public
router.post("/register", (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);

  // //check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  Company.findOne({
    email: req.body.email,
  }).then((company) => {
    if (company) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      // const avatar = gravatar.url(req.body.email, {
      //   s: "200", // Size
      //   r: "pg", // Rating
      //   d: "mm", // Default
      // });

      const newCompany = new Company({
        name: req.body.name,
        email: req.body.email,
        // avatar: avatar,
        login: req.body.login,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCompany.password, salt, (err, hash) => {
          if (err) throw err;
          newCompany.password = hash;
          newCompany
            .save()
            .then((company) => res.json(company))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route GET api/companies/test
// @desc Login companies / return JWT Token
// @access Public
router.post("/login", (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  // //check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const errors = {};
  const login = req.body.login;
  const password = req.body.password;

  // Find company by email
  Company.findOne({ login }).then((company) => {
    //check for company
    if (!company) {
      errors.login = "Company not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, company.password).then((isMatch) => {
      if (isMatch) {
        // company matched
        const payload = {
          id: company.id,
          name: company.name,
          avatar: company.avatar,
        };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/companies/current
// @desc Return current company
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.company.id,
      name: req.company.name,
      email: req.company.email,
      login: req.company.login,
    });
  }
);
module.exports = router;
