const card = document.querySelector(".card");
const question = document.querySelector("#question");
const answerOne = document.querySelector("#answer-one");
const answerTwo = document.querySelector("#answer-two");
const answerThree = document.querySelector("#answer-three");
const answerFour = document.querySelector("#answer-four");
const tryAgain = document.querySelector(".incorrect-text");
const score = document.querySelector("#points");
const buttonList = document.querySelectorAll(".front button");
const correctQuestion = document.querySelector("#correct-question");
const correctAnswer = document.querySelector("#correct-answer");
const extraInfo = document.querySelector("#extra-info");
const nextQuestion = document.querySelector(".back button");
const progressBarEl = document.querySelector("#progress-bar");
const progressBarImage = document.querySelector("#broomstick-circle");
const holdingContainer = document.querySelector(".holding-container");
const secondHoldingContainer = document.querySelector(
  ".second-holding-container"
);
const congratulationsText = document.querySelector(".top h2");
const tryAgainButton = document.querySelector("#try-again-button");
const quitButton = document.querySelector("#quit-button");
const finalImage = document.querySelector(".final-image");

let i = 0;
let j = 0;
let runningScore = 0;

let questionsArray = [];

//GRAB THE CORRECT QUESTIONS
const logJSONDataSlytherin = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/hufflepuff");
    if (response.ok) {
      const data = await response.json();
      questionsArray.push(data);
      question.textContent = questionsArray[0][i].question;
      answerOne.textContent = questionsArray[0][i].answers.first;
      answerTwo.textContent = questionsArray[0][i].answers.second;
      answerThree.textContent = questionsArray[0][i].answers.third;
      answerFour.textContent = questionsArray[0][i].answers.fourth;
    } else {
      console.log("There is an error");
    }
  } catch (e) {
    console.log(e);
  }
};

//INITIAL CALL OF THE DATA
logJSONDataSlytherin();

//CHECKS THAT THE ANSWER GIVEN IS CORRECT
const checkAnswer = (e) => {
  nextQuestion.disabled = false;
  if (e.target.id === "answer-one" && questionsArray[0][i].correct == 0) {
    completesCheckAnswer(e, 0);
    progressBar();
  } else if (
    e.target.id === "answer-two" &&
    questionsArray[0][i].correct == 1
  ) {
    completesCheckAnswer(e, 1);
    progressBar();
  } else if (
    e.target.id === "answer-three" &&
    questionsArray[0][i].correct == 2
  ) {
    completesCheckAnswer(e, 2);
    progressBar();
  } else if (
    e.target.id === "answer-four" &&
    questionsArray[0][i].correct == 3
  ) {
    completesCheckAnswer(e, 3);
    progressBar();
  } else {
    tryAgain.textContent = "That's incorrect- Try again";
    e.target.style.backgroundColor = "#d97873";
    e.target.style.color = "white";
  }
};

//STYLES THE ANSWERS IF CORRECT
const completesCheckAnswer = (e, number) => {
  e.target.disabled = true;
  e.target.style.backgroundColor = "#6aaf83 ";
  e.target.style.color = "white";
  backCardSetter(number);
};

//FLIPS THE CARD
const flipCard = () => {
  card.classList.toggle("flipCard");
};

//FUNCTION THAT FLIPS THE CARD AND THEN SETS THE TEXT
const backCardSetter = (number) => {
  if (i === 9) {
    nextQuestion.textContent = "Results";
  }
  let pointScore = 0;
  card.addEventListener("click", flipCard);
  setTimeout(() => card.removeEventListener("click", flipCard), 100);
  correctAnswer.textContent = buttonList[number].innerHTML;
  correctQuestion.textContent = questionsArray[0][i].question;
  extraInfo.textContent = questionsArray[0][i].info;
  buttonList.forEach((element) => {
    if (element.style.backgroundColor == "rgb(217, 120, 115)") {
      pointScore += 1;
    }
  });
  scoreSetter(pointScore);
  setTimeout(() => (score.textContent = `Score: ${runningScore}`), 100);
};

//USED TO DETERMINE THE POINTS SCORED PER QUESTION
const scoreSetter = (score) => {
  if (score === 0) {
    runningScore += 5;
  } else if (score === 1) {
    runningScore += 4;
  } else if (score === 2) {
    runningScore += 3;
  } else {
    runningScore += 2;
  }
};

//PROGRESS BAR FUNCTION
const progressBar = () => {
  if (j === 100) {
    null;
  } else {
    j += 10;
    progressBarEl.style.width = j + "%";

    progressBarImage.style.left = j - 1 + "%";
  }
};

//RESETS ALL THE ELEMENTS AND REPLACES THE QUESTION WITH THE NEXT ONE
const moveToNextQuestion = () => {
  if (i < 9) {
    i += 1;
    for (let button of buttonList) {
      if (button.disabled === true) {
        button.disabled = false;
      }
      button.style.backgroundColor = "#ccc";
      button.style.color = "black";
    }
    question.textContent = questionsArray[0][i].question;
    answerOne.textContent = questionsArray[0][i].answers.first;
    answerTwo.textContent = questionsArray[0][i].answers.second;
    answerThree.textContent = questionsArray[0][i].answers.third;
    answerFour.textContent = questionsArray[0][i].answers.fourth;
    tryAgain.textContent = "Click an answer!";
    card.classList.toggle("flipCard");
    nextQuestion.disabled = true;
  } else {
    holdingContainer.style.display = "none";
    secondHoldingContainer.style.display = "flex";
    score.textContent = "Loyal, just and true";
    if (runningScore > 39) {
      finalImage.src = "../../images/harry-potter-sorcerers-stone.gif";
      congratulationsText.textContent = `Congratulations for scoring ${runningScore} points; you are A QUIZZARD!`;
    } else if (runningScore > 29) {
      finalImage.src = "../../images/draco.gif";
      congratulationsText.textContent = `You scored ${runningScore} points; Draco claims you're a mudblood!`;
    } else {
      finalImage.src = "../../images/movie-fantasy.gif";
      congratulationsText.textContent = `You scored ${runningScore} points; must be a muggle!`;
    }
  }
};

//BUTTON EVENT LISTENER FOR MOVING ON TO THE NEXT QUESTION
nextQuestion.addEventListener("click", moveToNextQuestion);

//GIVES AN EVENT LISTENER TO EACH ANSWER
for (let button of buttonList) {
  button.addEventListener("click", checkAnswer);
}

//RESTARTS QUIZ
const restartQuiz = () => {
  location.reload();
};

//QUITS AND TAKES YOU TO HOMEPAGE
const quitQuiz = () => {
  location.href = "http://localhost:3000/";
};

//EVENT LISTENERS FOR TRY AGAIN AND QUIT
tryAgainButton.addEventListener("click", restartQuiz);
quitButton.addEventListener("click", quitQuiz);

//ALERT FOR USER TO SAY THAT THE QUIZ WILL BE LOST
window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "o/";

  (e || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
});
