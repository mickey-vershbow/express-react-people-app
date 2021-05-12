const { Schema, model } = require("mongoose");

const PeopleSchema = new Schema({
  name: String,
  image: String,
  title: String,
});

const People = model("People", PeopleSchema);

module.exports = People;
