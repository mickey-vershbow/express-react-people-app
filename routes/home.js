require("dotenv").config();
const router = require("express").Router();
const mongoose = require("../db/connection");
const db = mongoose.connection;
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
//IMPORT MIDDLEWARE
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021";
// const SECRET = process.env.SECRET || "secret";
const People = require("../Models/People");
const { restart } = require("nodemon");

///////////////////////////////
// ROUTES
////////////////////////////////

// test route
router.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
// router.get("/people", async (req, res) => {
//   try {
//     // send all people
//     res.json(await People.find({}));
//   } catch (error) {
//     //send error
//     res.status(400).json(error);
//   }
// });
router.get("/people", (req, res) => {
  People.find({}, (error, allPeople) => {
    res.json(allPeople);
  });
});

// PEOPLE CREATE ROUTE
// router.post("/people", async (req, res) => {
//   try {
//     // send all people
//     res.json(await People.create(req.body));
//   } catch (error) {
//     //send error
//     res.status(400).json(error);
//   }
// });
router.post("/people/", (req, res) => {
  People.create(req.body, (error, createdPeople) => {
    console.log(createdPeople);
    res.redirect("/people");
  });
});


///////////////////////////////
// EXPORT ROUTER
////////////////////////////////
module.exports = router;
