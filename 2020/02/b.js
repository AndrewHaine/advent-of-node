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
  const [req, pwd] = row.split(': ');

  const [indexes, search] = req.split(' ');

  const [a, b] = indexes.split('-').map(Number);

  const pwdParts = pwd.split('');

  const isA = pwdParts[a - 1] === search,
        isB = pwdParts[b - 1] === search;

  return isA && !isB || isB && !isA;
});

showAns(validPasswords.length);