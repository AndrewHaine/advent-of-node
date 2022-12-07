/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const rucksacks = input.split("\n");

const letterToIndex = letter => {
  let index = letter.toLowerCase().charCodeAt(0) - 96;

  if (letter === letter.toUpperCase()) {
    index += 26;
  }

  return index;
}

const commonItems = rucksacks.map(rucksack => {
  const length = rucksack.length;
  const [a, b] = [rucksack.substring(0, length / 2), rucksack.substring((length / 2), length)];

  return a
    .split('')
    .filter(item => b.includes(item))
    .at(0);
});

const totalPriorities = commonItems.reduce((total, commonItem) => {
  return total + letterToIndex(commonItem);
}, 0);

showAns(totalPriorities);