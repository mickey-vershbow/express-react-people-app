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


///////////////////////////////
// SEED DATA
////////////////////////////////
const peopleArr = [
  {
    name: "Cate Blanchett",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.EeBxvHj7mq2pFE6h1Eoy7wHaJZ%26pid%3DApi&f=1",
    title: "actress",
  },
  {
    name: "Kate Winslet",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ZUKsaf0HtlEmuiwZrImAWgHaLH%26pid%3DApi&f=1",
    title: "actress",
  },
  {
    name: "Olivia Coleman",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.nXOazAh81u-Wmn1xSVC52AHaOG%26pid%3DApi&f=1",
    title: "actress",
  },
  {
    name: "Regina King",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.EfSSlYJdApYI817iWYF0rwHaLH%26pid%3DApi&f=1",
    title: "actress",
  },
];


///////////////////////////////
// ROUTES
////////////////////////////////

// test route
router.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
router.get("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE DELETE ROUTE
router.delete("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(await People.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE UDPATE ROUTE
router.put("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
router.post("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//seed route
router.get("/seed", (req, res) => {
  People.collection.drop();
  People.create(peopleArr, (error, person) => {
    if (error) {
      console.log(error);
    } else {
      console.log(peopleArr);
      res.json(peopleArr);
    }
    db.close();
  });
});

///////////////////////////////
// EXPORT ROUTER
////////////////////////////////
module.exports = router;
