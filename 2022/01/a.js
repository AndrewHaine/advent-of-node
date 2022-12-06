/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const elves = input.split('\n\n');

const mostCalorificElfCalories = elves.reduce((largest, elf) => {
  const elfCalories = elf.split('\n').reduce((total, snack) => {
    return total + Number(snack);
  }, 0);

  if (elfCalories > largest) {
    return elfCalories
  }

  return largest;
}, 0);

showAns(mostCalorificElfCalories);