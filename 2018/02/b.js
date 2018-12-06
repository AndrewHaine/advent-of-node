/**
 * Advent of code solution (Bit funky - will refactor in time)
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const showAns = require("../../utils/index").showAns;
const dump = require("../../utils/index").dump;
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

const differentLetters = (currId, sampleId) => {
  let indexes = [];
  currId.split("").forEach((letter, i) => {
    if (sampleId.split("")[i] !== letter) {
      indexes.push(i);
      return true;
    }
  });
  return indexes;
};

const selectInputsWithOnlyOneDiff = inputs => {
  let matchingIds;

  inputs.every(currId => {
    const similarIds = inputs.filter(sampleId => {
      return differentLetters(currId, sampleId).length === 1;
    });

    if (similarIds.length) {
      matchingIds = [currId, similarIds[0]];
      return false;
    }

    return true;
  });

  return matchingIds;
};

const similarIds = selectInputsWithOnlyOneDiff(inputArray);

const indexToRemove = differentLetters(...similarIds);

let idToCheck = similarIds[0].split("");
idToCheck.splice(indexToRemove, 1);

showAns(idToCheck.join(""));
