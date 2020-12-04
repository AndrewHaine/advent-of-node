/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n\n");

const passports = inputArray.map(block => block.split('\n').join(' '));

const isValid = block => {
  const keys = block.split(' ').map(field => field.split(':')[0]);
  const valid = keys.length === 8 || (keys.length === 7 && !keys.includes('cid'));
  return valid;
};

const validPassports = passports.filter(p => isValid(p));

showAns(validPassports.length);