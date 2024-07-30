const cardArray = [
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' }
];

let cardsChosen = [];
let cardsChosenId = [];
const cardsWon = [];

cardArray.sort(() => 0.5 - Math.random());

const gridDisp = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const notificationDisplay = document.querySelector("#notification");

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-no', i);
        card.setAttribute('alt', 'blank');
        card.addEventListener('click', flipCard);
        gridDisp.appendChild(card);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('#grid img');
    const optionOne = cardsChosenId[0];
    const optionTwo = cardsChosenId[1];

    if (optionOne === optionTwo) {
        cards[optionOne].setAttribute('src', 'images/blank.png');
        cards[optionTwo].setAttribute('src', 'images/blank.png');
        notificationDisplay.textContent = "You have clicked the same image";
    } else if (cardsChosen[0] === cardsChosen[1]) {
        notificationDisplay.textContent = "You found a match!";
        cards[optionOne].setAttribute('src', 'images/white.png');
        cards[optionTwo].setAttribute('src', 'images/white.png');
        cards[optionOne].removeEventListener('click', flipCard);
        cards[optionTwo].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        notificationDisplay.textContent = "Try again";
        cards[optionOne].setAttribute('src', 'images/blank.png');
        cards[optionTwo].setAttribute('src', 'images/blank.png');
    }

    cards[optionOne].classList.remove('flipped');
    cards[optionTwo].classList.remove('flipped');

    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.innerHTML = "Congratulations! You found them all";
        setTimeout(() => {
            gridDisp.innerHTML = "";
            gridDisp.style.cursor = "default";
        }, 1000);
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-no');
    if (!this.classList.contains('flipped') && cardsChosen.length < 2) {
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", cardArray[cardId].img);
        this.classList.add("flipped");
        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

createBoard();
