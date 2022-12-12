/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const cycles = input.split("\n");
let cycleIndex = 0;
let xValue = 1;
let output = "#";

const checkCycle = () => {
    const xPixels = [xValue, xValue - 1, xValue + 1];

    if (xPixels.includes(cycleIndex)) {
        output += '#';
    } else {
        output += '.';
    }

    if (cycleIndex === 40) {
        output += "\n#";
        cycleIndex = 0;
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

console.log(output);