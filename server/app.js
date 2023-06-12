const express = require("express");
const cors = require("cors");
const app = express();

let questions = require("./questions.json");

app.use(cors());
app.use(express.json());

//API homepage
app.get("/", function (req, res) {
  res.send(
    "Welcome to the Quizzard API. Add 'questions' to get all the available questions or the name of a house to filter 10 questions by question type"
  );
});

//all questions
app.get("/questions", function (req, res) {
  res.send(questions);
});

//10 ravenclaw questions
app.get("/questions", function (req, res) {
  res.send(questions);
});

//10 gryffindor questions
app.get("/questions", function (req, res) {
  res.send(questions);
});

//10 hufflepuff questions
app.get("/questions", function (req, res) {
  res.send(questions);
});

//10 slytherin questions
app.get("/questions", function (req, res) {
  res.send(questions);
});

module.exports = app;
