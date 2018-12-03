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

const frequencyArr = [0];
let frequencyFound = false;

const findFrequency = freq => {
  const finalFrequency = inputArray.reduce((frequency, delta) => {
    let newFrequency = frequency + Number(delta);

    if (frequencyArr.includes(newFrequency) && !frequencyFound) {
      frequencyFound = true;
      showAns(newFrequency);
    }

    frequencyArr.push(newFrequency);

    return newFrequency;
  }, freq);

  return frequencyFound ? true : findFrequency(finalFrequency);
};

findFrequency(0);
