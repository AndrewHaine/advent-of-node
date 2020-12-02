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

  const [count, search] = req.split(' ');

  const instances = pwd.split('').filter(char => char === search);

  const [min, max] = count.split('-').map(Number);

  return instances.length >= min && instances.length <= max;
});

showAns(validPasswords.length);