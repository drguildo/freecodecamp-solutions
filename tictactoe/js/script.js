// @ts-check

// TODO: Player can choose to be noughts or crosses
// TODO: Game resets as soon as it's over
// TODO: Make UI look good when small
// TODO: Convert tictactoe.js code to using enums

"use strict";

let gameStates = {
  ENDED: 0,
  INPROGRESS: 1
};

let game = {
  // The two players are represented as 1 and -1. This is because it's
  // how the underlying minimax algorithm treats them and so does away
  // with the need to be constantly converting between the two
  // representations.
  board: [],
  state: gameStates.INPROGRESS,
  scorePlayer: 0,
  scoreComputer: 0
};

function getCellValue(row, col) {
  return ~~select(`.cell[data-row='${row}'][data-column='${col}']`).textContent;
}

// Places a mark on the grid and updates the game state accordingly.
function setCellValue(row, col, val) {
  if (game.state !== gameStates.INPROGRESS) {
    return;
  }

  let element = select(`.cell[data-row='${row}'][data-column='${col}']`);
  if (element.textContent) {
    throw "CellOccupied";
  }
  element.textContent = val;

  game.board = domToArray();

  let s = score(game.board);
  if (s !== -2) {
    game.state = gameStates.ENDED;
    switch (s) {
    case -1:
      computerWon();
      break;
    case 1:
      playerWon();
      break;
    case 0:
      draw();
      break;
    }
  }
}

// Convert the game state stored in the HTML to a two-dimensional array
// that can be used by our minimax algorithm.
function domToArray() {
  let arr = [];
  for (let row = 0; row < 3; row++) {
    arr.push([]);
    for (let col = 0; col < 3; col++) {
      arr[row].push(getCellValue(row, col));
    }
  }
  return arr;
}

function cellClickHandler(event) {
  if (game.state !== gameStates.INPROGRESS) {
    return;
  }

  // Read the player's move and place it on the grid
  let cellCoords = event.target.dataset;
  try {
    setCellValue(cellCoords.row, cellCoords.column, 1);
  } catch (e) {
    console.log("Cell occupied");
    return;
  }

  computerMove();

  id("score-player").textContent = game.scorePlayer.toString();
  id("score-computer").textContent = game.scoreComputer.toString();
};

// Calculate the computer's move and place it on the grid
function computerMove() {
  let m = minimax(-1, game.board);
  let bestOpponentMove = m.move;
  try {
    setCellValue(...bestOpponentMove, -1);
  } catch (e) {
    return;
  }
}

function newGame() {
  selectAll(".cell").forEach(el => el.textContent = "");

  id("player-select").style.display = "initial";

  game.state = gameStates.INPROGRESS;
}

function playerSelectedNoughts() {
  console.log("Noughts selected");
}

function playerSelectedCrosses() {
  console.log("Crosses selected");
}

function computerWon() {
  game.scoreComputer++;
  id("score-computer").textContent = game.scoreComputer.toString();
  displayMessage("Computer won");
}

function playerWon() {
  game.scorePlayer++;
  id("score-player").textContent = game.scorePlayer.toString();
  displayMessage("You won");
}

function draw() {
  displayMessage("Draw");
}

function displayMessage(msg) {
  id("message").textContent = msg;
}

ready(() => {
  selectAll(".cell").forEach(el => el.addEventListener("click",
    cellClickHandler));

  id("player-select-noughts").addEventListener("click",
    playerSelectedNoughts);
  id("player-select-crosses").addEventListener("click",
    playerSelectedCrosses);

  newGame();
});