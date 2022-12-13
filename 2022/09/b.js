/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const moves = input.split("\n");

const knots = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
const tailPositions = [[0, 0]];

const addPosition = (x, y) => {
    const exists = tailPositions.some(position => {
        return position[0] === x && position[1] === y;
    });

    if (!exists) {
        tailPositions.push([x, y]);
    }
}

const moveHead = instructions => {
    const [direction, delta] = instructions.split(' ');

    Array(Math.abs(delta))
        .fill()
        .forEach(() => {
            switch(direction) {
                case 'L':
                    knots[0][0]--;
                    break;
                case 'R':
                    knots[0][0]++;
                    break;
                case 'U':
                    knots[0][1]++;
                    break;
                case 'D':
                    knots[0][1]--;
                    break;
            }

            const trailingKnots = knots.slice(1);
            trailingKnots.forEach((trailingKnot, parentIndex) => {
                const parentKnot = knots[parentIndex];

                if (parentKnot[0] === trailingKnot[0] || parentKnot[1] === trailingKnot[1]) {
                    if (parentKnot[0] - trailingKnot[0] > 1) {
                        trailingKnot[0]++;
                    } else if (parentKnot[0] - trailingKnot[0] < -1) {
                        trailingKnot[0]--;
                    } else if (parentKnot[1] - trailingKnot[1] > 1) {
                        trailingKnot[1]++;
                    } else if (parentKnot[1] - trailingKnot[1] < -1) {
                        trailingKnot[1]--;
                    }
                } else if (Math.abs(parentKnot[0] - trailingKnot[0]) > 1 || Math.abs(parentKnot[1] - trailingKnot[1]) > 1) {
                    if (parentKnot[0] > trailingKnot[0] && parentKnot[1] > trailingKnot[1]) {
                        trailingKnot[0]++;
                        trailingKnot[1]++;
                    } else if (parentKnot[0] > trailingKnot[0] && parentKnot[1] < trailingKnot[1]) {
                        trailingKnot[0]++;
                        trailingKnot[1]--;
                    } else if (parentKnot[0] < trailingKnot[0] && parentKnot[1] < trailingKnot[1]) {
                        trailingKnot[0]--;
                        trailingKnot[1]--;
                    } else if (parentKnot[0] < trailingKnot[0] && parentKnot[1] > trailingKnot[1]) {
                        trailingKnot[0]--;
                        trailingKnot[1]++;
                    }
                }

                if (parentIndex === 8) {
                  addPosition(...trailingKnot);
                }
            });
        });
}

moves.forEach(move => {
    moveHead(move);
});

showAns(tailPositions.length);