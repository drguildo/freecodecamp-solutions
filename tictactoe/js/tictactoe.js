// @ts-check

"use strict";

/**
 * Scores the given game
 * @param {Array} game The current game state
 * @returns {Number} The player that won, 0 in the case of a draw or otherwise -2
 */
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

/**
 * Given the current game state and player who's turn it is, recursively
 * generate each legal possible resultant state, score it and choose the
 * best move and score.
 * 
 * @param {Number} player The player who's turn it is
 * @param {Array} game The current game state
 * @returns {Object} The best move and score
 */
function minimax(player, game) {
  let s = score(game);

  if (s !== -2) {
    return {
      move: null,
      score: s
    };
  }

  let moves = getAvailableMoves(game);
  let scores = [];

  let otherPlayer = player === 1 ? -1 : 1;
  moves.forEach(move => {
    let newState = getNewState(game, move, player);
    let m = minimax(otherPlayer, newState).score;
    scores.push(m);
  });

  let index = player === 1 ? findIndexMax(scores) : findIndexMin(scores);

  return {
    move: moves[index],
    score: scores[index]
  };
}
