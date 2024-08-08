(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const grid = document.querySelector('.grid');
        const result = document.querySelector('#result');
        const displayCurrentPlayer = document.querySelector('#current-player');
        let currentPlayer = 1;

        // Create the grid dynamically
        for (let i = 0; i < 42; i++) {
            const div = document.createElement('div');
            grid.appendChild(div);
        }

        const squares = document.querySelectorAll('.grid div');

        const winningArrays = [
            // Horizontal wins
            [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
            [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
            [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
            [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
            [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
            [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
            // Vertical wins
            [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24],
            [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27], [7, 14, 21, 28],
            [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32],
            [12, 19, 26, 33], [13, 20, 27, 34], [14, 21, 28, 35], [15, 22, 29, 36],
            [16, 23, 30, 37], [17, 24, 31, 38], [18, 25, 32, 39], [19, 26, 33, 40],
            [20, 27, 34, 41],
            // Diagonal wins (top-left to bottom-right)
            [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
            [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
            [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
            // Diagonal wins (bottom-left to top-right)
            [21, 15, 9, 3], [22, 16, 10, 4], [23, 17, 11, 5], [24, 18, 12, 6],
            [28, 22, 16, 10], [29, 23, 17, 11], [30, 24, 18, 12], [31, 25, 19, 13],
            [35, 29, 23, 17], [36, 30, 24, 18], [37, 31, 25, 19], [38, 32, 26, 20]
        ];

        function checkBoard() {
            for (let y = 0; y < winningArrays.length; y++) {
                const square1 = squares[winningArrays[y][0]];
                const square2 = squares[winningArrays[y][1]];
                const square3 = squares[winningArrays[y][2]];
                const square4 = squares[winningArrays[y][3]];

                // Check for Player One win
                if (
                    square1.classList.contains('player-one') &&
                    square2.classList.contains('player-one') &&
                    square3.classList.contains('player-one') &&
                    square4.classList.contains('player-one')
                ) {
                    result.innerHTML = 'Player One Wins!';
                    result.style.color = '#e74c3c'; // Red color for Player One wins
                    return;
                }

                // Check for Player Two win
                if (
                    square1.classList.contains('player-two') &&
                    square2.classList.contains('player-two') &&
                    square3.classList.contains('player-two') &&
                    square4.classList.contains('player-two')
                ) {
                    result.innerHTML = 'Player Two Wins!';
                    result.style.color = '#3498db'; // Blue color for Player Two wins
                    return;
                }
            }

        }

        function checkGameEnd() {
            let gameEnd = false;
            for (let y = 0; y < winningArrays.length; y++) {
                const square1 = squares[winningArrays[y][0]];
                const square2 = squares[winningArrays[y][1]];
                const square3 = squares[winningArrays[y][2]];
                const square4 = squares[winningArrays[y][3]];

                // Check for Player One win
                if (
                    square1.classList.contains('player-one') &&
                    square2.classList.contains('player-one') &&
                    square3.classList.contains('player-one') &&
                    square4.classList.contains('player-one')
                ) {
                    result.innerHTML = 'Player One Wins!';
                    result.style.color = '#e74c3c'; // Red color for Player One wins
                    gameEnd = true;
                    break;
                }

                // Check for Player Two win
                if (
                    square1.classList.contains('player-two') &&
                    square2.classList.contains('player-two') &&
                    square3.classList.contains('player-two') &&
                    square4.classList.contains('player-two')
                ) {
                    result.innerHTML = 'Player Two Wins!';
                    result.style.color = '#3498db'; // Blue color for Player Two wins
                    gameEnd = true;
                    break;
                }
            }
            const player = document.querySelector('#player');
            if (gameEnd) {
                // Remove current player from HTML
                player.remove();
                // Remove click event from squares
                squares.forEach(square => {
                    square.onclick = null;
                });
                
            }
        }


        squares.forEach((square, index) => {
            square.onclick = () => {
                // Check if the square below is taken
                if ((index < 35 && squares[index + 7].classList.contains('taken')) || index >= 35) {
                    if (currentPlayer == 1) {
                        square.classList.add('taken');
                        square.classList.add('player-one');
                        square.style.backgroundColor = '#e74c3c';
                        currentPlayer = 2;
                    } else if(currentPlayer == 2) {
                        square.classList.add('taken');
                        square.classList.add('player-two');
                        currentPlayer = 1;
                    }
                    displayCurrentPlayer.textContent = currentPlayer;
                    checkGameEnd();

                    // Toggle between player backgrounds
                    square.style.backgroundColor = currentPlayer === 1 ? '#3498db' : '#e74c3c';
                    
                    // Disable click event for the current square
                    square.onclick = null;
                } else {
                    alert('Cannot place a disc here');
                }
            };
        });
    });
})();