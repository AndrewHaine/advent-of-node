/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");
const rounds = input.split("\n");

const values = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}

const winningCombinations = {
  'X': 'C',
  'Y': 'A',
  'Z': 'B',
}

const drawingCombinations = {
  'X': 'A',
  'Y': 'B',
  'Z': 'C',
}

const calculateScore = result => {
  const [opponent, us] = result.split(' ');
  const isWin = opponent === winningCombinations[us];
  const isDraw = opponent === drawingCombinations[us];

  let score = values[us];

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