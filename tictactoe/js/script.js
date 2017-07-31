let gameState = {
  // The two players are represented as 1 and -1. This is because it's
  // how the underlying minimax algorithm treats them and so does away
  // with the need to be constantly converting between the two
  // representations.
  board: []
};

function getCellValue(row, col) {
  return ~~document.querySelector(`#cell-${row}-${col}`).textContent;
}

function setCellValue(row, col, val) {
  document.querySelector(`#cell-${row}-${col}`).textContent = val;
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
  event.target.textContent = 1;
  gameState.board = domToArray();
  let bestOpponentMove = minimax(-1, gameState.board).move;
  console.log(bestOpponentMove);
  setCellValue(...bestOpponentMove, -1);
};

function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function newGame() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach(function (el) {
    el.addEventListener("click", cellClickHandler);
    el.textContent = "";
  });
}

ready(() => {
  newGame();
});