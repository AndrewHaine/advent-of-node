/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

let roundNumber = 0;

const monkeys = input
  .split('\n\n')
  .map(monkeyInput => {
    const lines = monkeyInput.split('\n');

    // Get the starting items
    const startingItemsString = lines[1].trim().match(/^Starting items: (.*)$/);
    const items = startingItemsString[1]?.split(', ').map(Number) ?? [];

    // Get the operation
    const operationString = lines[2].trim().match(/^Operation: new = old (.*)$/);
    const operation = operationString[1] ?? null;

    // Get the test divisor
    const testString = lines[3].trim().match(/^Test: divisible by (\d+)$/);
    const testDivisor = Number(testString[1] ?? 1);

    // Where to throw the item if the test passes
    const truthyMonkeyLine = lines[4].trim();
    const truthyMonkeyIndex = Number(truthyMonkeyLine.charAt(truthyMonkeyLine.length - 1));

    // Where to throw the item if the test fails
    const falseyMonkeyLine = lines[5].trim();
    const falseyMonkeyIndex = Number(falseyMonkeyLine.charAt(falseyMonkeyLine.length - 1));

    return {
      items,
      operation,
      testDivisor,
      truthyMonkeyIndex,
      falseyMonkeyIndex,
      inspectedCount: 0,
    }
  });

const applyWorryLevel = (item, operation) => {
  let [line, operator, value] = operation.match(/^([\*\+\-]) ([0-9old]+)$/);

  if (value === 'old') {
    value = item;
  }

  value = Number(value);

  switch (operator) {
    case '*':
      return item * value;
    case '+':
      return item + value;
    case '-':
      return item - value;
  }
}

while(roundNumber < 20) {
  monkeys.forEach((monkey) => {
    const {
      items,
      operation,
      testDivisor,
      truthyMonkeyIndex,
      falseyMonkeyIndex
    } = monkey;

    while(items.length > 0) {
      const item = items.shift();
      const newItemWorryLevel = applyWorryLevel(item, operation);

      const newItem = Math.floor(newItemWorryLevel / 3);

      if (newItem % testDivisor === 0) {
        monkeys[truthyMonkeyIndex].items.push(newItem);
      } else {
        monkeys[falseyMonkeyIndex].items.push(newItem);
      }

      monkey.inspectedCount++;
    }
  })

  roundNumber++;
}

const monkeysByInspectedCount = monkeys.sort((a, b) => b.inspectedCount - a.inspectedCount);

const monkeyBusiness = [0, 1].reduce((total, index) => {
  return total * monkeysByInspectedCount[index].inspectedCount;
}, 1);

showAns(monkeyBusiness);