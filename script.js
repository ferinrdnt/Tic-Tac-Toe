const squares = document.querySelectorAll('.square');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let isXNext = true;
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const index = Array.from(squares).indexOf(event.target);

    if (board[index] || calculateWinner()) {
        return;
    }

    board[index] = isXNext ? 'X' : 'O';
    event.target.textContent = board[index];

    if (calculateWinner()) {
        statusDisplay.textContent = `Winner: ${board[index]}`;
    } else {
        isXNext = !isXNext;
        statusDisplay.textContent = `Next player: ${isXNext ? 'X' : 'O'}`;
    }
}

function calculateWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function resetGame() {
    board.fill(null);
    squares.forEach(square => (square.textContent = ''));
    isXNext = true;
    statusDisplay.textContent = 'Next player: X';
}

squares.forEach(square => square.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
