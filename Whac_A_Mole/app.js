const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const startButton = document.getElementById('start-button');
const endButton = document.getElementById('end-button');

let result = 0;
let hitPos;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove("mole");
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPos = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPos) {
            result++;
            score.textContent = result;
            hitPos = null;
        }
    });
});

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        saveScore();
        alert("GAME OVER!");
        endGame();
    }
}

function startGame() {
    result = 0;
    currentTime = 60;
    score.textContent = result;
    timeLeft.textContent = currentTime;
    startButton.disabled = true;
    endButton.disabled = false;
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
}

function endGame() {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    startButton.disabled = false;
    endButton.disabled = true;
}

function saveScore() {
    let playerName = prompt("Enter your name:");
    if (playerName) {
        let previousScores = JSON.parse(localStorage.getItem("whacScores")) || [];
        previousScores.push({ name: playerName, score: result });
        localStorage.setItem("whacScores", JSON.stringify(previousScores));
    }
}

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
