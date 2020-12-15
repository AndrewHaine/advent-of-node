/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const groups = input.split("\n\n");

const uniqueQuestions = groups.map(group => {
  const questions = group.replace(/\n/g, '');
  const unique = questions.split('').reduce((acc, curr) => {
    if(!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return unique.length;
});

showAns(uniqueQuestions.reduce((a, b) => (a + b)));