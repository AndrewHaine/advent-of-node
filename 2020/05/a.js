/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

const reduceSet = (upper, lower, letter, upperLetter) => {
    const set = letter === upperLetter ? 'upper' : 'lower';
    const length = Number(upper) - Number(lower);
    console.log(length);
    if(length === 1) {
        return {
            ans: set === 'upper' ? upper : lower
        };
    }

    return {
        ans: null,
        upper: set === 'upper' ? upper : lower + Math.floor(length / 2),
        lower: set === 'upper' ? lower + Math.ceil(length / 2) : lower
    }
};

const getRow = seat => {
    const rowData = seat.split('').slice(0,7);
    console.log(rowData);
    let ans = null;
    let upper = 127;
    let lower = 0;
    let i = 0;

    while(!ans) {
        const test = reduceSet(upper, lower, rowData[i], 'B');
        ans = test.ans;
        upper = test.upper;
        lower = test.lower;
        i++;
    }

    return ans;
};

const getCol = seat => {
    const colData = seat.split('').slice(7,10);
    let ans = null;
    let upper = 7;
    let lower = 0;
    let i = 0;

    while(!ans) {
        const test = reduceSet(upper, lower, colData[i], 'R');
        ans = test.ans;
        upper = test.upper;
        lower = test.lower;
        i++;
    }

    return ans;
};

const seatNumbers = inputArray.map(seat => {
  console.log(seat);
  const row = getRow(seat);
  const col = getCol(seat);

  return (row * 8) + col;
});

console.log(seatNumbers);