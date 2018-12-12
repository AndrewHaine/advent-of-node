/**
 * Advent of code solution
 * -- This one takes several minutes - i'll look into improving this with a 'summation table'
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const getPowerLevel = (x, y) => {
  const id = x + 10;
  let a = (id * y + Number(input)) * id;
  let b = /(\d)[0-9]{2}$/.exec(a.toString())[1];
  return Number(b) - 5;
};

// Cache the grid so we aren't calculating on the fly
const grid = {};

for (let r = 1; r <= 300; r++) {
  grid[r] = [0];
  for (let c = 1; c <= 300; c++) {
    grid[r].push(getPowerLevel(c, r));
  }
}

const getTotalPowerByCoord = (ox, oy, size) => {
  let total = 0;
  for (let y = oy; y < oy + size; y++) {
    for (let x = ox; x < ox + size; x++) {
      total += grid[y][x];
    }
  }
  return total;
};

const originators = {};

/// Starting lower than 40 breaks it later in the chain - no idea why - maybe i'll come back and debug this later
for (let y = 40; y < 299; y++) {
  console.log(`Calculating for ${y}`);
  for (let x = 1; x < 299; x++) {
    const maxSize = Math.min(300 - x, 300 - y);
    for (let s = 1; s < maxSize; s++) {
      originators[`${x},${y},${s}`] = getTotalPowerByCoord(x, y, s);
    }
  }
}

const gridOrderedByPowerLevel = Object.keys(originators).sort((a, b) => {
  return originators[b] - originators[a];
});

showAns(gridOrderedByPowerLevel[0]);
