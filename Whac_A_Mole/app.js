const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPos;
let currentTime = 60;
let timerId = null;

function randomSquare(){
     squares.forEach(square =>{
        square.classList.remove("mole")
     });

    let randomSquare = squares[Math.floor(Math.random()*9)];
    randomSquare.classList.add('mole'); 
    
    hitPos = randomSquare.id;
}

squares.forEach(square =>{
    square.addEventListener('mousedown',() => {
        if(square.id == hitPos){
            result++;
            score.textContent = result;
            hitPos = null;
        }
    });
})


function moveMole(){
    
    timerId = setInterval(randomSquare,1000);
}

moveMole();

function countDown(){
    currentTime--;
    timeLeft.textContent=currentTime;
    if(currentTime == 0){
        clearInterval(countDownTimerId);
        clearInterval(timerId)
        alert("GAME OVER !");
    }
}

let countDownTimerId = setInterval(countDown,1000)