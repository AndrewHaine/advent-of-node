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
  const [all, ...[min, max, search, pwd]] = partsExpression.exec(row) || [];

  const instances = pwd.split('').filter(char => char === search);

  return instances.length >= min && instances.length <= max;
});

showAns(validPasswords.length);