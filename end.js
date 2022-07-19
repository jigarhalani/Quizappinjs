const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const currentScore = document.getElementById("currentScore");
const gameScore = localStorage.getItem('gameScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

currentScore.innerText = gameScore;
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  const score = {
    score: gameScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a,b) =>  b.score - a.score)
  highScores.splice(5);
  localStorage.setItem('highScores',JSON.stringify(highScores)); 
  window.location.assign("/");

  e.preventDefault();
};
