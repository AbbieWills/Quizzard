const express = require("express");
const cors = require("cors");
const app = express();

let questions = require("./questions.json");

app.use(cors());
app.use(express.json());

//basically swaps the last item of the array each time with a random element from the list for array length revolutions
const randomFunc = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//function to filter through an object
const filter = (filterWord) => {
  return questions.filter((type) => type.category === filterWord);
};

//API homepage
app.get("/", function (req, res) {
  res.send(
    "Welcome to the Quizzard API. Add 'questions' to get all the available questions or the name of a house to filter 10 questions by question type"
  );
});

//all questions
app.get("/questions", function (req, res) {
  res.status(200).send(questions);
});

//10 ravenclaw questions
app.get("/ravenclaw", function (req, res) {
  let filteredQuestions = filter("ravenclaw");
  let result = randomFunc(filteredQuestions);
  res.status(200).send(result);
});

//10 gryffindor questions
app.get("/gryffindor", function (req, res) {
  let filteredQuestions = filter("gryffindor");
  let result = randomFunc(filteredQuestions);
  res.status(200).send(result);
});

//10 hufflepuff questions
app.get("/hufflepuff", function (req, res) {
  let filteredQuestions = filter("Hufflepuff");
  let result = randomFunc(filteredQuestions);
  res.res.status(200).send(result);
});

//10 slytherin questions
app.get("/slytherin", function (req, res) {
  let filteredQuestions = filter("slytherin");
  let result = randomFunc(filteredQuestions);
  res.res.status(200).send(result);
});

module.exports = app;
