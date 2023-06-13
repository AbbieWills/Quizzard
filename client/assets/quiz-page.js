const card = document.querySelector(".card");
const question = document.querySelector("#question");
const answerOne = document.querySelector("#answer-one");
const answerTwo = document.querySelector("#answer-two");
const answerThree = document.querySelector("#answer-three");
const answerFour = document.querySelector("#answer-four");
const score = document.querySelector("#points");

const flipCard = () => {
  card.classList.toggle("flipCard");
};

// card.addEventListener("click", flipCard);

let questionsArray = [];

logJSONData = async () => {
  try {
    const response = await fetch("http://localhost:3000/slytherin");
    if (response.ok) {
      const data = await response.json();
      questionsArray.push(data);
      question.textContent = questionsArray[0][0].question;
      answerOne.textContent = questionsArray[0][0].answers.first;
      answerTwo.textContent = questionsArray[0][0].answers.second;
      answerThree.textContent = questionsArray[0][0].answers.third;
      answerFour.textContent = questionsArray[0][0].answers.fourth;
    } else {
      console.log("There is an error");
    }
  } catch (e) {
    console.log(e);
  }
};

logJSONData();

const checkAnswerOne = () => {
  if (questionsArray[0][0].correct == 0) {
    answerOne.style.backgroundColor = "green";
    answerOne.style.color = "white";
  } else {
    answerOne.style.backgroundColor = "red";
    answerOne.style.color = "white";
  }
};

const checkAnswerTwo = () => {
  if (questionsArray[0][0].correct == 1) {
    answerOne.style.backgroundColor = "green";
    answerOne.style.color = "white";
  } else {
    answerTwo.style.backgroundColor = "red";
    answerTwo.style.color = "white";
  }
};

const checkAnswerThree = () => {
  if (questionsArray[0][0].correct == 2) {
    answerOne.style.backgroundColor = "green";
    answerOne.style.color = "white";
  } else {
    answerThree.style.backgroundColor = "red";
    answerThree.style.color = "white";
  }
};

const checkAnswerFour = () => {
  if (questionsArray[0][0].correct == 3) {
    answerOne.style.backgroundColor = "green";
    answerOne.style.color = "white";
  } else {
    answerFour.style.backgroundColor = "red";
    answerFour.style.color = "white";
  }
};

answerOne.addEventListener("click", checkAnswerOne);
answerTwo.addEventListener("click", checkAnswerTwo);
answerThree.addEventListener("click", checkAnswerThree);
answerFour.addEventListener("click", checkAnswerFour);
