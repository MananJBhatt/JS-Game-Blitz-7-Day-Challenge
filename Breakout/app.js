const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const startButton = document.querySelector('#start-button');
const endButton = document.querySelector('#end-button');
const hitSound = document.querySelector('#hit-sound');

const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let score = 0;
let xDirection = 2;
let yDirection = 2;
let timerId;

const userStart = [230, 10];
let currentPos = [...userStart];

const ballStart = [270, 40];
let ballCurrentPos = [...ballStart];

let blocks = [];

// Create the user paddle and ball elements
const user = document.createElement('div');
user.classList.add('user');

const ball = document.createElement('div');
ball.classList.add('ball');

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

function createBlocks() {
    blocks = [
        new Block(10, 270),
        new Block(120, 270),
        new Block(230, 270),
        new Block(340, 270),
        new Block(450, 270),
        new Block(10, 240),
        new Block(120, 240),
        new Block(230, 240),
        new Block(340, 240),
        new Block(450, 240),
        new Block(10, 210),
        new Block(120, 210),
        new Block(230, 210),
        new Block(340, 210),
        new Block(450, 210),
    ];
}

function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

function drawUser() {
    user.style.left = currentPos[0] + 'px';
    user.style.bottom = currentPos[1] + 'px';
}

function drawBall() {
    ball.style.bottom = ballCurrentPos[1] + 'px';
    ball.style.left = ballCurrentPos[0] + 'px';
}

function moveUser(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (currentPos[0] > 0) {
                currentPos[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPos[0] < boardWidth - blockWidth) {
                currentPos[0] += 10;
                drawUser();
            }
            break;
        default:
            break;
    }
}

function moveBall() {
    ballCurrentPos[0] += xDirection;
    ballCurrentPos[1] += yDirection;
    drawBall();
    collisionCheck();
}

function collisionCheck() {
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPos[0] > blocks[i].bottomLeft[0] && ballCurrentPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPos[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPos[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;
            hitSound.play();
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "You Win";
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
                startButton.disabled = false;
                endButton.disabled = true;
            }
        }
    }

    if (ballCurrentPos[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPos[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPos[0] <= 0) {
        changeDirection();
    }

    if ((ballCurrentPos[0] > currentPos[0] && ballCurrentPos[0] < currentPos[0] + blockWidth) &&
        ballCurrentPos[1] > currentPos[1] && ballCurrentPos[1] < currentPos[1] + blockHeight) {
        changeDirection();
    }

    if (ballCurrentPos[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = "You Lose";
        document.removeEventListener('keydown', moveUser);
        startButton.disabled = false;
        endButton.disabled = true;
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}

function startGame() {
    grid.innerHTML = '';
    createBlocks();
    addBlock();
    currentPos = [...userStart];
    ballCurrentPos = [...ballStart];
    drawUser();
    drawBall();
    grid.appendChild(user);
    grid.appendChild(ball);
    document.addEventListener('keydown', moveUser);
    timerId = setInterval(moveBall, 30);
    startButton.disabled = true;
    endButton.disabled = false;
    score = 0;
    scoreDisplay.innerHTML = score;
}

function endGame() {
    clearInterval(timerId);
    document.removeEventListener('keydown', moveUser);
    grid.innerHTML = '';
    startButton.disabled = false;
    endButton.disabled = true;
}

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
