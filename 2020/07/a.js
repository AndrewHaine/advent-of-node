/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const rules = input.split("\n");

const splitRule = rule => {
  const regex = /^([a-z ]+) bags contain (.*).$/i
  const [all, ...[outer, rest]] = regex.exec(rule) || [];
  const contains = rest.split(', ').map(inner => inner.match(/\d+/)[0]);

  return {
    outer,
    contains
  };
}

console.log(rules.map(splitRule));

// const countContainers = bagType => {
//   rules.filter()
// }
