const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
const startButton = document.getElementById("start-button");
let currentShooterIndex = 202;
const width = 15;
let aliensRemoved = [];
let invadersId;
let isGoingRight = true;
let direction = 1;
let results = 0;
let gameInProgress = false;
let alienInvaders = [];
let squares;

function createGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        grid.appendChild(square);
    }
}

function initializeAliens() {
    alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];
}

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}

function moveShooter(e) {
    if (!gameInProgress) return;
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            isGoingRight = false;
        }
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            isGoingRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    draw();

    // Check for game over condition
    if (alienInvaders.some(index => !aliensRemoved.includes(alienInvaders.indexOf(index)) && 
       (index >= currentShooterIndex || squares[index].classList.contains('shooter')))) {
        resultDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
        gameInProgress = false;
    }

    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = "YOU WIN";
        clearInterval(invadersId);
        gameInProgress = false;
    }
}

function startGame() {
    if (gameInProgress) return;
    gameInProgress = true;
    aliensRemoved = [];
    results = 0;
    resultDisplay.innerHTML = results;
    createGrid();
    initializeAliens();
    squares = Array.from(document.querySelectorAll(".grid div"));
    squares[currentShooterIndex].classList.add("shooter");
    draw();
    invadersId = setInterval(moveInvaders, 600);
}

startButton.addEventListener("click", startGame);

function shoot(e) {
    if (!gameInProgress) return;
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
            clearInterval(laserId);

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            results++;
            resultDisplay.innerHTML = results;
        }

        if (currentLaserIndex < width) {
            clearInterval(laserId);
            setTimeout(() => squares[currentLaserIndex].classList.remove("laser"), 100);
        }
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener("keydown", shoot);