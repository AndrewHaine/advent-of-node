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
  const people = group.split(/\n/);

  const allPeople = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((acc, curr) => {
    if(people.every(person => person.split('').includes(curr))) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return allPeople.length;
});

showAns(uniqueQuestions.reduce((a, b) => (a + b)));
