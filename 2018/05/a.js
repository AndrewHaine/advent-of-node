/**
 * Advent of code solution
 * Day 5, Part 1
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const showAns = require("../../utils/index").showAns;
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const unitSearchRegex = /([A-Z])(?=\1)/gi;

const removeUnits = polymer => {
  while ((unit = unitSearchRegex.exec(polymer)) != null) {
    if (unit[0] !== polymer.charAt(unit.index + 1)) {
      polymer = polymer.slice(0, unit.index) + polymer.slice(unit.index + 2);
      unitSearchRegex.lastIndex = unit.index - 1;
    }
  }
  return polymer;
};

showAns(removeUnits(input).length);
