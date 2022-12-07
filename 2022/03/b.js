/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import chunk from 'chunk';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const rucksacks = input.split("\n");
const groups = chunk(rucksacks, 3);

const letterToIndex = letter => {
  let index = letter.toLowerCase().charCodeAt(0) - 96;

  if (letter === letter.toUpperCase()) {
    index += 26;
  }

  return index;
}

const groupBadges = groups.map(groupRucksacks => {
    const commonItem = groupRucksacks[0].split('').filter(item => {
      return groupRucksacks.every(groupRucksack => groupRucksack.includes(item));
    });

    return commonItem.at(0);
});

 const totalPriorities = groupBadges.reduce((total, commonItem) => {
   return total + letterToIndex(commonItem);
 }, 0);

 showAns(totalPriorities);