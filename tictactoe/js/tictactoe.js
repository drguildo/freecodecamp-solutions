// @ts-check

// 1 is the player
// -1 is the opponent

let bestMove = [];

// Check for an end state. The score is equal to the player that won, 0
// in the case of a draw or -2 if the game is still in progress.
function score(game) {
  for (let i = 0; i < 3; i++) {
    // Check each row
    if (game[i][0] === game[i][1] && game[i][0] === game[i][2]) {
      if (game[i][0] === 1 || game[i][0] === -1) {
        return game[i][0];
      }
    }
    // Check each column
    if (game[0][i] === game[1][i] && game[0][i] === game[2][i]) {
      if (game[0][i] === 1 || game[0][i] === -1) {
        return game[0][i];
      }
    }
  }
  // Check diagonal lines
  if (game[0][0] === game[1][1] && game[0][0] === game[2][2]) {
    if (game[0][0] === 1 || game[0][0] === -1) {
      return game[0][0];
    }
  }
  if (game[0][2] === game[1][1] && game[0][2] === game[2][0]) {
    if (game[0][2] === 1 || game[0][2] === -1) {
      return game[0][2];
    }
  }
  // If every cell is occupied then the game has ended in a draw
  if (game.every(row => row.every(cell => cell !== 0))) {
    return 0;
  }
  return -2;
}

function getAvailableMoves(game) {
  let available = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game[i][j] === 0) {
        available.push([i, j]);
      }
    }
  }
  return available;
}

function getNewState(oldState, move, player) {
  let newState = [];
  newState[0] = oldState[0].slice(0);
  newState[1] = oldState[1].slice(0);
  newState[2] = oldState[2].slice(0);
  newState[move[0]][move[1]] = player;
  return newState;
}

function findIndexMax(arr) {
  if (arr.length === 0) {
    throw "array is empty";
  }
  return arr.reduce((indexMax, val, index) => val > arr[indexMax] ? index :
    indexMax, 0);
}

function findIndexMin(arr) {
  if (arr.length === 0) {
    throw "array is empty";
  }
  return arr.reduce((indexMin, val, index) => val < arr[indexMin] ? index :
    indexMin, 0);
}

function minimax(player, game) {
  console.log("minimax", player);
  console.log(printBoard(game));

  let s = score(game);

  if (s !== -2) {
    return s;
  }

  let moves = getAvailableMoves(game);
  let scores = [];

  let otherPlayer = player === 1 ? -1 : 1;
  moves.forEach(move => {
    let newState = getNewState(game, move, player);
    let m = minimax(otherPlayer, newState);
    scores.push(m);
  });

  // console.log(printBoard(game));
  let index = player === 1 ? findIndexMax(scores) : findIndexMin(scores);
  bestMove = moves[index];
  // console.log(printPlayer(player), "chose", bestMove);
  return scores[index];
}

function printBoard(game) {
  let s = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      s += printPlayer(game[i][j]);
      s += " ";
    }
    if (i < 2) {
      s += "\n";
    }
  }
  return s;
}

function printPlayer(player) {
  switch (player) {
  case 1:
    return " 1";
  case -1:
    return "-1";
  default:
    return "  ";
  }
}

let empty = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let game1 = [
  [-1, 1, -1],
  [0, -1, 1],
  [0, 1, 0]
];
let game2 = [
  [1, -1, 1],
  [0, -1, 1],
  [0, 0, 0]
];

console.log(minimax(1, game2));
console.log(bestMove);
