/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n").map(Number);

const parts = inputArray.flatMap((row, i) => {
  const toCheck = inputArray.slice(i, inputArray.length);
  const found = toCheck.flatMap(test => {
    const req = 2020 - (test + row);
    return inputArray.includes(req) ? [test, req] : [];
  });
  return found.length === 2 ? [row, ...found] : [];
});

showAns(parts.reduce((a, b) => a * b));