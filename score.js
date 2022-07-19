const scoreLists = document.getElementById('scroeLists');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];



scoreLists.innerHTML = highScores.map(score => {
    return `<li class="high-score"> ${score.name} - ${score.score} </li>`
}).join("");