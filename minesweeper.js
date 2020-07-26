document.addEventListener("DOMContentLoaded", startGame);

//check to see if won!!
document.addEventListener("click", checkForWin);
document.addEventListener("contextmenu", checkForWin);

// Define your `board` object here!
let board = {};

//define size of the board
let gridSize = 6;

//Create grid layout and add cell properties
function makeBoard() {
  //Make an empty array for board propert cells
  board.cells = [];
  for (let rowNum = 0; rowNum < gridSize; rowNum++) {
    for (let colNum = 0; colNum < gridSize; colNum++) {
      board.cells.push({
        row: rowNum,
        col: colNum,
        isMine: Math.round(Math.random() >= 0.7),
        isMarked: false,
        hidden: true,
      });
    }
  }
}
function startGame() {
  makeBoard();
  // Don't remove this function call: it makes the game work!

  lib.initBoard();

  //assign mine count numbers to board
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].isMarked = false;
  }
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  let youWin = true;
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true && board.cells[i].ismarked === false) {
      youWin = false;
    }
    if (board.cells[i].isMine !== true && board.cells[i].hidden === true) {
      youWin = false;
      // console.log(youWin)
    }
  }
  // detected that they've won.
  if (youWin) {
    lib.displayMessage("You win!");
  }
}

function resetGame() {
  console.log("hello emma");
  board = {};
  document.querySelector(".board").innerHTML = "";
  startGame();
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let countBombs = 0;
  surrounding.forEach((cell) => {
    if (cell.isMine) {
      countBombs++;
    }
  });
  return countBombs;
}
