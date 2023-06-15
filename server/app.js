const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

let questions = require("./questions.json");

app.use(express.static(path.join(__dirname, "../client/Home")));
app.use(express.static(path.join(__dirname, "../client/assets/")));
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

const tenQuestions = (arr) => {
  let newArr = [];
  for (let i = 0; i < 10; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

//Routes
app.get("/", function (req, res) {
  res.sendFile(path.resolve("../client/Home/home-page.html"));
});

//gryffindor route
app.get("/gryffindor", function (req, res) {
  res.sendFile(
    path.resolve(
      "../client/assets/Quiz Pages/Gryffindor/quiz-page-gryffindor.html"
    )
  );
});

//ravenclaw route
app.get("/ravenclaw", function (req, res) {
  res.sendFile(
    path.resolve(
      "../client/assets/Quiz Pages/Ravenclaw/quiz-page-ravenclaw.html"
    )
  );
});

//hufflepuff route
app.get("/hufflepuff", function (req, res) {
  res.sendFile(
    path.resolve("../client/assets/Quiz Pages/Hufflepuff/quiz-page-huffle.html")
  );
});

//slytherin route
app.get("/slytherin", function (req, res) {
  res.sendFile(
    path.resolve(
      "../client/assets/Quiz Pages/Slytherin/quiz-page-slytherin.html"
    )
  );
});


//API homepage
app.get("/api", function (req, res) {
  res.send(
    "Welcome to the Quizzard API. Add 'questions' to get all the available questions or the name of a house to filter 10 questions by question type"
  );
});

//all questions
app.get("/api/questions", function (req, res) {
  res.status(200).send(questions);
});

//10 ravenclaw questions
app.get("/api/ravenclaw", function (req, res) {
  let filteredQuestions = filter("ravenclaw");
  let result = randomFunc(filteredQuestions);
  let finalResult = tenQuestions(result);
  res.status(200).send(finalResult);
});

//10 gryffindor questions
app.get("/api/gryffindor", function (req, res) {
  let filteredQuestions = filter("gryffindor");
  let result = randomFunc(filteredQuestions);
  let finalResult = tenQuestions(result);
  res.status(200).send(finalResult);
});

//10 hufflepuff questions
app.get("/api/hufflepuff", function (req, res) {
  let filteredQuestions = filter("Hufflepuff");
  let result = randomFunc(filteredQuestions);
  let finalResult = tenQuestions(result);
  res.status(200).send(finalResult);
});

//10 slytherin questions
app.get("/api/slytherin", function (req, res) {
  let filteredQuestions = filter("Slytherin");
  let result = randomFunc(filteredQuestions);
  let finalResult = tenQuestions(result);
  res.status(200).send(finalResult);
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.resolve("../client/error.html"));
});

module.exports = app;
