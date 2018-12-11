/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

const points = [];

inputArray.forEach((point, i) => {
  const [string, startCoords, velocity] = point.match(
    /^position=<(.*)> velocity=<(.*)>$/
  );
  const [x, y] = startCoords.split(", ").map(Number);
  const [dx, dy] = velocity.split(", ").map(Number);
  points[i] = { coords: { x, y }, delta: { dx, dy } };
});

const boxDimensions = 62;
let aligned = false;
let seconds = 0;

let xMax, xMin, yMax, yMin;

while (!aligned) {
  seconds++;
  let xVals = [],
    yVals = [];

  points.map(point => {
    const { coords, delta } = point;
    const { dx, dy } = delta;

    let x = (coords.x += dx);
    let y = (coords.y += dy);

    xVals.push(x);
    yVals.push(y);

    return {
      coords: { x, y },
      delta: { dx, dy }
    };
  });

  [xMax, xMin] = [Math.max(...xVals), Math.min(...xVals)];
  [yMax, yMin] = [Math.max(...yVals), Math.min(...yVals)];

  aligned = xMax - xMin < boxDimensions && yMax - yMin < boxDimensions;
}

showAns(seconds);
