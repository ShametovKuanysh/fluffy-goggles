const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const ejs = require("ejs");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const orders = require("./routes/api/orders");
const meals = require("./routes/api/meals");
const institutions = require("./routes/api/institutions");
const companies = require("./routes/api/companies");
const companyprofiles = require("./routes/api/companyprofiles");
const rooms = require("./routes/api/rooms");
const seats = require("./routes/api/seats");
const films = require("./routes/api/films");
const sessions = require("./routes/api/sessions");

var Institution = require("./models/Institution.js");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Conncetion
mongoose
  .connect(db)
  .then(() => console.log("mongoose connect"))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//passport config
require("./config/passport")(passport);

//use routes

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/orders", orders);
app.use("/api/meals", meals);
app.use("/api/institutions", institutions);
app.use("/api/companies", companies);
app.use("/api/companyprofiles", companyprofiles);
app.use("/api/rooms", rooms);
app.use("/api/seats", seats);
app.use("/api/films", films);
app.use("/api/sessions", sessions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/institutions", async (req, res) => {
  try {
    const institutionss = await Institution.find();
    res.render("./pages/index.ejs", {
      page: "institutionss",
      institutionss: institutionss,
      // results: reviewsAll,
      // groups,
    });
  } catch (err) {
    console.log(err);
    // res.render("pages_before/index.ejs", {
    //   results: reviewsAll,
    //   groups: [],
    // });
  }
});
