/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const assignmentPairs = input.split("\n");

const getSections = assignment => {
  const [start, end] = assignment.split('-').map(Number);
  return Array.from({length: (end - start) + 1}, (i, j) => start + j);
}

const fullyOverlappingAssignments = assignmentPairs.filter(assignmentPair => {
  const [a, b] = assignmentPair.split(',');
  const aSections = getSections(a);
  const bSections = getSections(b);

  return aSections.every(section => bSections.includes(section)) || bSections.every(section => aSections.includes(section));
})

showAns(fullyOverlappingAssignments.length)