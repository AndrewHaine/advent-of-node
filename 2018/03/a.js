/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const showAns = require("../../utils/index").showAns;
const dump = require("../../utils/index").dump;
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

const grid = {};

inputArray.forEach(claim => {
  const pos = claim.split(" @ ")[1];

  const [x, y] = [...pos.split(": ")[0].split(",")].map(Number);
  const [w, h] = [...pos.split(": ")[1].split("x")].map(Number);

  // Loop through the rows in the claim
  for (let r = y + h; r > y; r--) {
    // For each column in the row add the coord to the grid and count
    for (let c = x + w; c > x; c--) {
      // Add the coords to the grid
      let coords = `${r},${c}`;
      grid[coords] = grid[coords] ? grid[coords] + 1 : 1;
    }
  }
});

const overlaps = Object.values(grid).filter(freq => freq > 1);
showAns(overlaps.length);
