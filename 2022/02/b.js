/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");
const rounds = input.split("\n");

const values = {
  'A': 1,
  'B': 2,
  'C': 3,
}

const winningCombinations = {
  'A': 'C',
  'B': 'A',
  'C': 'B',
}

const losingCombinations = {
  'A': 'B',
  'B': 'C',
  'C': 'A',
}

const calculateScore = result => {
  const [opponent, us] = result.split(' ');
  const isWin = us === 'Z';
  const isDraw = us === 'Y';

  // We lose by default
  let ourShape = winningCombinations[opponent];

  if (isDraw) {
    ourShape = opponent
  } else if (isWin) {
    ourShape = losingCombinations[opponent];
  }

  let score = values[ourShape];

  if (isWin) {
    score += 6;
  } else if (isDraw) {
    score += 3;
  }

  return score;
}

const totalScore = rounds.reduce((total, round) => {
  return total + calculateScore(round);
}, 0);

showAns(totalScore);

