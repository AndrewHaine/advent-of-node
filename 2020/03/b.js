/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

const getTrees = (dx, dy, rows) => {
  let x = 0,
      y = 0,
      trees = 0;

  while(y < rows.length) {
    const entities = rows[y].split('');
    const entity = entities[x];

    if(entity === '#') {
      trees++;
    }

    const nextX = x + dx;

    if(nextX > ((entities.length) - 1)) {
      x = (nextX - entities.length);
    } else {
      x = nextX;
    }

    y += dy;
  }

  return trees;
};

const slopes = [
  { dx: 1, dy: 1 },
  { dx: 3, dy: 1 },
  { dx: 5, dy: 1 },
  { dx: 7, dy: 1 },
  { dx: 1, dy: 2 },
];

const treeCounts = slopes.map(({ dx, dy }) => getTrees(dx, dy, inputArray));

showAns(treeCounts.reduce((a, b) => (a * b)));