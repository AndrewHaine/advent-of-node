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

const getCoordsFromClaim = claim => {
  const pos = claim.split(" @ ")[1];

  const [x, y] = [...pos.split(": ")[0].split(",")].map(Number);
  const [w, h] = [...pos.split(": ")[1].split("x")].map(Number);

  const squares = [];

  // Loop through the rows in the claim
  for (let r = y + h; r > y; r--) {
    // For each column in the row add the coord to the grid and count
    for (let c = x + w; c > x; c--) {
      // Add the coords to the grid
      squares.push(`${r},${c}`);
    }
  }

  return squares;
};

// Add the coords + frequencies to the grid
inputArray.forEach(claim => {
  const claimSquares = getCoordsFromClaim(claim);
  claimSquares.forEach(squareCoord => {
    grid[squareCoord] = grid[squareCoord] ? grid[squareCoord] + 1 : 1;
  });
});

// Find the only claim where all it's squares have a frequency of exactly '1'
const untouchedClaim = inputArray.filter(claim => {
  const claimSquares = getCoordsFromClaim(claim);
  return claimSquares.every(squareCoord => grid[squareCoord] === 1);
});

// Extract the ID
showAns(untouchedClaim[0].split(" @ ")[0].replace("#", ""));
