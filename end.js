const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const currentScore = document.getElementById("currentScore");
const gameScore = localStorage.getItem('gameScore');

currentScore.innerText = gameScore;
username.addEventListener("keyup", () => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("clicked the save button");
  e.preventDefault();
};
