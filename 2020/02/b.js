/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

const validPasswords = inputArray.filter(row => {

  const partsExpression = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/;
  const [all, ...[a, b, search, pwd]] = partsExpression.exec(row) || [];

  const pwdParts = pwd.split('');

  const isA = pwdParts[a - 1] === search,
        isB = pwdParts[b - 1] === search;

  return isA && !isB || isB && !isA;
});

showAns(validPasswords.length);