console.log("Hello World!")
const question= document.getElementById('question');
const choices= Array.from(document.getElementsByClassName('choice-text'));


const scoreCounterText= document.getElementById('score');
const queCounterText= document.getElementById('questionCounter');


let currentQuestion = {};
let acceptingAnswer = false;
let score=0;
let questionCounter = 0;
let availableQuestion = [];
let BONUS= 5;
let MAX_QUESTION= 3;



let questions =[
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
      },
      {
        question:
          "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
      },
      {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
      }
];

startGame = () => {
    questionCounter= 0;
    score=0;
    availableQuestion= [...questions];
    console.log(availableQuestion);
    getNewQuestion();

}

getNewQuestion = () => {
    if(questionCounter > MAX_QUESTION - 1)
    {
        localStorage.setItem('gameScore',score);
        window.location.assign("end.html");
    }
    currentQuestion= availableQuestion[questionCounter];
    questionCounter++;
    queCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
    question.innerText= currentQuestion.question;

    choices.forEach(choice => {
        const number= choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+number];
    });

    acceptingAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener("click",e => {
        if(!acceptingAnswer) return;
        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if(classToApply=='correct'){
            incrementScore();
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
        },1000)
    
    });
});

incrementScore = () => {
  score+= BONUS;
  scoreCounterText.innerText = score;
}

startGame();