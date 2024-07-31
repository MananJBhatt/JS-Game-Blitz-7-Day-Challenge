const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let score = 0;
let xDirection = 2;
let yDirection = 2;

const userStart = [230, 10];
let currentPos = userStart;

const ballStart = [270, 40];
let ballCurrentPos = ballStart;

let timerId;

//create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// Blocks 
const blocks = [
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

]

console.log(blocks[0])

function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');

        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';

        grid.appendChild(block);
    }
}

addBlock();

// User

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);


//draw User 
function drawUser() {
    user.style.left = currentPos[0] + 'px';
    user.style.bottom = currentPos[1] + 'px';
}

function drawBall() {
    ball.style.bottom = ballCurrentPos[1] + 'px';
    ball.style.left = ballCurrentPos[0] + 'px';
}


//user movement
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

document.addEventListener('keydown', moveUser);


// Add ball object
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall()
grid.appendChild(ball);


// ball movement
function moveBall() {
    ballCurrentPos[0] += xDirection;
    ballCurrentPos[1] += yDirection;
    drawBall();
    collisonCheck();
}


timerId = setInterval(moveBall, 30) // change time interval for more difficulty

//boundary check
function collisonCheck() {
    // block collison
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPos[0] > blocks[i].bottomLeft[0] && ballCurrentPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPos[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPos[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block')); //making an array
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;
            // win check
            if(blocks.length === 0){
                scoreDisplay.innerHTML = "You Win";
                clearInterval(timerId);
                document.removeEventListener('keydown',moveUser);
            }
        }

    }



    // check for wall collsion
    if (ballCurrentPos[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPos[1] >= (boardHeight) ||
        ballCurrentPos[0] <= 0) {
        changeDirection();
    }

    // user collison
    if ((ballCurrentPos[0] > currentPos[0] && ballCurrentPos[0] < currentPos[0] + blockWidth) &&
         ballCurrentPos[1] > currentPos[1] && ballCurrentPos[1] < currentPos[1] +blockHeight   ){
            changeDirection();
    }




        // check for game end
        if (ballCurrentPos[1] <= 0) {
            clearInterval(timerId);
            scoreDisplay.innerHTML = "You Lose";
            document.removeEventListener('keydown', moveUser)
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