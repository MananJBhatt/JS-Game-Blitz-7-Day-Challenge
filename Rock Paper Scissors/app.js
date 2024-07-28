let computerChoiceDisplay = document.getElementById('computer-choice');
let userChoiceDisplay = document.getElementById('your-choice');
let resultDisplay = document.getElementById('result');
let winsDisplay = document.getElementById('wins');
let lossesDisplay = document.getElementById('losses');
let drawsDisplay = document.getElementById('draws');

let userChoice;
let computerChoice;
const possibleChoices = document.querySelectorAll('.choices img');

let wins = localStorage.getItem('wins') ? parseInt(localStorage.getItem('wins')) : 0;
let losses = localStorage.getItem('losses') ? parseInt(localStorage.getItem('losses')) : 0;
let draws = localStorage.getItem('draws') ? parseInt(localStorage.getItem('draws')) : 0;

updateScoreBoard();

possibleChoices.forEach(choice => choice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = capitalizeFirstLetter(userChoice);
    generateComputerChoice();
    getResult();
}));

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    const choices = ['rock', 'paper', 'scissors'];
    computerChoice = choices[randomNumber];
    computerChoiceDisplay.innerHTML = capitalizeFirstLetter(computerChoice);
}

function getResult() {
    if (computerChoice === userChoice) {
        resultDisplay.innerHTML = "It's a tie!";
        document.getElementById('draw-sound').play();
        draws++;
        localStorage.setItem('draws', draws);
    } else if ((computerChoice === 'rock' && userChoice === 'paper') ||
               (computerChoice === 'paper' && userChoice === 'scissors') ||
               (computerChoice === 'scissors' && userChoice === 'rock')) {
        resultDisplay.innerHTML = "You win!";
        document.getElementById('win-sound').play();
        wins++;
        localStorage.setItem('wins', wins);
    } else {
        resultDisplay.innerHTML = "You lose!";
        document.getElementById('lose-sound').play();
        losses++;
        localStorage.setItem('losses', losses);
    }
    updateScoreBoard();
    animateResult();
}

function updateScoreBoard() {
    winsDisplay.innerHTML = wins;
    lossesDisplay.innerHTML = losses;
    drawsDisplay.innerHTML = draws;
}

function animateResult() {
    resultDisplay.classList.add('animate');
    setTimeout(() => {
        resultDisplay.classList.remove('animate');
    }, 500);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
