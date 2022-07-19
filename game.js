console.log("Hello World!");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const scoreCounterText = document.getElementById("score");
const queCounterText = document.getElementById("questionCounter");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let BONUS = 5;
let MAX_QUESTION = 3;

let questions = [];

fetch("question.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questions];
  console.log(availableQuestion);
  getNewQuestion();
};

getNewQuestion = () => {
  if (questionCounter > MAX_QUESTION - 1) {
    localStorage.setItem("gameScore", score);
    window.location.assign("end.html");
  }
  currentQuestion = availableQuestion[questionCounter];
  questionCounter++;
  queCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  acceptingAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;
    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply == "correct") {
      incrementScore();
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = () => {
  score += BONUS;
  scoreCounterText.innerText = score;
};
