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

const letterReducer = (letters, currLetter) => {
  letters[currLetter] = letters[currLetter] ? letters[currLetter] + 1 : 1;
  return letters;
};

const inputCounts = inputArray.map(id => {
  idArr = id.split("");
  return idArr.reduce(letterReducer, {});
});

const letterCountReducer = (counts, currId) => {
  const frequencies = Object.values(currId);
  Object.keys(counts).forEach(count => {
    if (frequencies.includes(Number(count))) {
      counts[count]++;
    }
  });
  return counts;
};

const counts = inputCounts.reduce(letterCountReducer, {
  2: 0,
  3: 0
});

const checksum = Object.values(counts).reduce((acc, val) => acc * val, 1);

showAns(checksum);
