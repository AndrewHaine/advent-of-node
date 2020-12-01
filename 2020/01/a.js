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
  const found = inputArray.slice(i, inputArray.length)
                      .filter(test => test + row === 2020)[0];
  return found ? [row, found] : [];
});

showAns(parts.reduce((a, b) => a * b));