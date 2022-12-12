/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const cycles = input.split("\n");
let cycleIndex = 1;
let xValue = 1;

const indicatorsRecorded = [];
const indicatorValues = [];

const checkCycle = i => {
    if (i === 20 || i === indicatorsRecorded.at(-1) + 40) {
        indicatorsRecorded.push(i);
        indicatorValues.push(xValue * i);
    }
}

cycles.forEach((instruction) => {
    cycleIndex++;
    checkCycle(cycleIndex);

    if (instruction === 'noop') {
        return;
    } else {
        cycleIndex++;
        const [o, value] = instruction.match(/addx ([0-9\-]+)/);
        xValue += Number(value);
        checkCycle(cycleIndex);
    }
});

const answer = indicatorValues.reduce((total, value) => total + value, 0);

showAns(answer);
