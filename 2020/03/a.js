/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

const rows = inputArray;

let y = 0;
let x = 0;
let trees = 0;

while(y < rows.length) {
  const entities = rows[y].split('');
  const entity = entities[x];

  if(entity === '#') {
    trees++;
  }

  const nextX = x + 3;

  if(nextX > ((entities.length) - 1)) {
    x = (nextX - entities.length);
  } else {
    x = nextX;
  }

  y++;
}

showAns(trees);