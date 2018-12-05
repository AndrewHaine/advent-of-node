/**
 * Advent of code solution
 * Day 5, Part 2
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const showAns = require("../../utils/index").showAns;
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const lengths = {};

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

/**
 * For each letter of the alphabet, remove all corresponding unit
 * and calculate the polymer lengh without the reacting units
 */
Array(26)
  .fill()
  .forEach((i, j) => {
    const letter = String.fromCharCode(j + 65);
    const length = removeUnits(input.replace(new RegExp(`${letter}`, "gi"), ""))
      .length;
    console.log({ letter, length });
    lengths[letter] = length;
  });

const shortestPolymer = Object.keys(lengths).sort((a, b) => {
  return lengths[a] - lengths[b];
})[0];

showAns(lengths[shortestPolymer]);
