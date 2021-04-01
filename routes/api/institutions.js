const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input validation
const validateInstitutionInput = require("../../validation/institution.js");

// Load User model
const Institution = require("../../models/Institution");
// CompanyProfile model
const CompanyProfile = require("../../models/CompanyProfile");
//Order model
const Order = require("../../models/Order");

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Institutions Works" }));

// @route   GET api/institutions
// @desc    Get institutions
// @access  Public
router.get("/", (req, res) => {
  Institution.find()
    .populate({ path: "institution", model: "rooms", select: "id name" })
    .populate("meals", ["name", "cost"])
    .sort({ date: -1 })
    .then((institutions) => res.json(institutions))
    .catch((err) =>
      res.status(404).json({ noinstitutionsfound: "No institutions found" })
    );
});

// @route   GET api/institutions/:id
// @desc    Get institution by id
// @access  Public
router.get("/:id", (req, res) => {
  Institution.findById(req.params.id)
    .then((institution) => res.json(institution))
    .catch((err) =>
      res
        .status(404)
        .json({ noinstitutionfound: "No institution found with that ID" })
    );
});

// @route   POST api/institutions
// @desc    Create institution
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInstitutionInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newInstitution = {};
    newInstitution.user = req.user.id;
    if (req.body.text) newInstitution.text = req.body.text;
    if (req.body.name) newInstitution.name = req.body.name;
    if (req.body.description) newInstitution.description = req.body.description;
    if (req.body.usual_cost) newInstitution.usual_cost = req.body.usual_cost;
    if (req.body.address) newInstitution.address = req.body.address;
    if (req.body.count_place) newInstitution.count_place = req.body.count_place;
    if (req.body.institutiontype)
      newInstitution.institutiontype = req.body.institutiontype;

    // const newInstitution = new Institution({
    //   text: req.body.text,
    //   name: req.body.name,
    //   avatar: req.body.avatar,
    //   description: req.body.description,
    //   usual_cost: req.body.usual_cost,
    //   address: req.body.address,
    //   count_place: req.body.count_place,
    //   institutiontype: req.body.institutiontype,
    //   user: req.user.id,
    // });

    Institution.findOne({ user: req.user.id, name: req.body.name }).then(
      (institution) => {
        if (institution) {
          // Update
          Institution.findOneAndUpdate(
            { user: req.user.id },
            { $set: newInstitution },
            { new: true }
          ).then((institution) => res.json(institution));
        } else {
          // Create

          // Check if name exists
          Institution.findOne({ name: newInstitution.name }).then(
            (institution) => {
              if (institution) {
                errors.handle = "That name already exists";
                res.status(400).json(errors);
              }

              // Save Institution
              new Institution(newInstitution)
                .save()
                .then((institution) => res.json(institution));
            }
          );
        }
      }
    );

    // new Institution(newInstitution)
    //   .save()
    //   .then((institution) => res.json(institution));
    // newInstitution.save().then((institution) => res.json(institution));
  }
);

// @route   DELETE api/institutions/:id
// @desc    Delete institution
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CompanyProfile.findOne({ company: req.user.id }).then((companyprofile) => {
      Institution.findById(req.params.id)
        .then((institution) => {
          // Check for institution owner
          if (institution.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          institution.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ institutionnotfound: "No institution found" })
        );
    });
  }
);

// @route   POST api/institutions/like/:id
// @desc    Like institution
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CompanyProfile.findOne({ company: req.user.id }).then((companyprofile) => {
      Institution.findById(req.params.id)
        .then((institution) => {
          if (
            institution.likes.filter(
              (like) => like.user.toString() === req.user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this institution" });
          }

          // Add user id to likes array
          institution.likes.unshift({ user: req.user.id });

          institution.save().then((institution) => res.json(institution));
        })
        .catch((err) =>
          res.status(404).json({ institutionnotfound: "No institution found" })
        );
    });
  }
);

// @route   POST api/institutions/unlike/:id
// @desc    Unlike institution
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CompanyProfile.findOne({ user: req.user.id }).then((companyprofile) => {
      Institution.findById(req.params.id)
        .then((institution) => {
          if (
            institution.likes.filter(
              (like) => like.user.toString() === req.user.id
            ).length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this institution" });
          }

          // Get remove index
          const removeIndex = institution.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          institution.likes.splice(removeIndex, 1);

          // Save
          institution.save().then((institution) => res.json(institution));
        })
        .catch((err) =>
          res.status(404).json({ institutionnotfound: "No institution found" })
        );
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Institution.findById(req.params.id)
      .then((institution) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array
        institution.comments.unshift(newComment);

        // Save
        institution.save().then((institution) => res.json(institution));
      })
      .catch((err) =>
        res.status(404).json({ institutionnotfound: "No institution found" })
      );
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Institution.findById(req.params.id)
      .then((institution) => {
        // Check to see if comment exists
        if (
          institution.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = institution.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        institution.comments.splice(removeIndex, 1);

        institution.save().then((institution) => res.json(institution));
      })
      .catch((err) =>
        res.status(404).json({ institutionnotfound: "No institution found" })
      );
  }
);

//create order
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Institution.findById(req.params.id)
      .then((institution) => {
        const newOrder = new Order({
          cost: req.body.cost,
          institution: req.params.id,
          places: req.body.places,
          user: req.user.id,
        });
        // res.json(newOrder);
        // db.order.insert({ cost: 10 });

        newOrder.save().then((order) => res.json(order));
        // institution.save().then((institution) => res.json(institution));
      })
      .catch((err) =>
        res.status(404).json({ institutionnotfound: "No institution found" })
      );
  }
);

module.exports = router;
