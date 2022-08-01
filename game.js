console.log("Hello World!");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const loader = document.getElementById("loader");
const game = document.getElementById("game");

const scoreCounterText = document.getElementById("score");
const queCounterText = document.getElementById("questionCounter");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let BONUS = 5;
let MAX_QUESTION = 9;

let questions = [];

function transformQuestions(loadedquestions) {
  return loadedquestions.map((loadedquestion) => {
    const formattedQuestion = {
      question: loadedquestion.question,
    };
    const answerChoices = [...loadedquestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    answerChoices.splice(
      formattedQuestion.answer - 1,
      0,
      loadedquestion.correct_answer
    );
    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });
    return formattedQuestion;
  });
}

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = transformQuestions(loadedQuestions.results);
    //questions = loadedQuestions;
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
  game.classList.remove('hidden');
  loader.classList.add('hidden');
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
