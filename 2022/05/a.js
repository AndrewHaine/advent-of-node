/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const [initialStacks, moves] = input.split('\n\n');

const convertStacksToObject = input => {
  const rows = input.split('\n').reverse();
  const stacks = rows.shift();

  return stacks.split('').reduce((convertedStacks, stack, i) => {
    if (stack.match(/[0-9]/)) {
      convertedStacks[stack] = rows
        .map(row => row.split('').at(i))
        .filter(crate => crate?.match(/[A-Z]/));
    }

    return convertedStacks;
  }, {});
}

const stacksObject = convertStacksToObject(initialStacks);

moves.split('\n').forEach(move => {
  const [all, take, source, target] = move.match(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/);
  const toMove = stacksObject[source].splice(-Math.abs(take)).reverse();
  stacksObject[target].push(...toMove);
});

const topCrates = Object.values(stacksObject).map(stack => stack.at(-1));

showAns(topCrates.join(''));


