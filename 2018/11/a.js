/**
 * Advent of code solution
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

const getTotalPowerByCoord = (ox, oy) => {
  let total = 0;
  for (let y = oy; y < oy + 3; y++) {
    for (let x = ox; x < ox + 3; x++) {
      total += getPowerLevel(x, y);
    }
  }
  return total;
};

const originators = {};

for (let y = 1; y < 299; y++) {
  for (let x = 1; x < 299; x++) {
    originators[`${x},${y}`] = getTotalPowerByCoord(x, y);
  }
}

const gridOrderedByPowerLevel = Object.keys(originators).sort((a, b) => {
  return originators[b] - originators[a];
});

showAns(gridOrderedByPowerLevel[0]);
