
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Create cells
function createBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener('click', handleCellClick);
    board.appendChild(div);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  createBoard();
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameBoard.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === currentPlayer);
  });
}

resetBtn.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

// Initialize
createBoard();
statusText.textContent = `Player ${currentPlayer}'s turn`;

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (!gameActive || gameBoard[index] !== '') return;
  
    gameBoard[index] = currentPlayer;
    createBoard();
  
    const cellDiv = board.children[index];
    cellDiv.classList.add('played');
  
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      highlightWinningCells();
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
  
      if (currentPlayer === 'O' && aiEnabled) {
        setTimeout(makeAIMove, 500); // Delay for realism
      }
    }
  }
  function highlightWinningCells() {
    for (let combo of winningCombinations) {
      if (combo.every(index => gameBoard[index] === currentPlayer)) {
        combo.forEach(index => {
          board.children[index].classList.add('winning');
        });
        break;
      }
    }
  }
    