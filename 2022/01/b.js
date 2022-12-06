/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");
const elves = input.split('\n\n');

const topThreeCalorificElves = elves
  .map(elf => {
    const elfCalories = elf.split('\n').reduce((total, snack) => {
      return total + Number(snack);
    }, 0);
    return elfCalories;
  })
  .sort((a, b) => b - a)
  .slice(0, 3);

const totalCalories = topThreeCalorificElves.reduce((total, snack) => {
  return total + snack;
}, 0);

showAns(totalCalories);

