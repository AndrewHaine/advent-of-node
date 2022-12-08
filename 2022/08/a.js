/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const inputArray = input.split("\n");

const map = inputArray.map(row => row.split(''));

const visibleTop = (x, y, height) => {
    const rowsToCheck = map.slice(0, y);
    return rowsToCheck.every(row => row[x] < height);
}

const visibleLeft = (x, y, height) => {
    const treesToCheck = map[y].slice(0, x);
    return treesToCheck.every(tree => tree < height);
}

const visibleRight = (x, y, height) => {
    const treesToCheck = map[y].slice(x + 1, map[y].length);
    return treesToCheck.every(tree => tree < height);
}

const visibleBottom = (x, y, height) => {
    const rowsToCheck = map.slice(y + 1, map.length);
    return rowsToCheck.every(row => row[x] < height);
}

const visible = (x, y, height) => {
    return (
        visibleBottom(x, y, height) ||
        visibleLeft(x, y, height) ||
        visibleRight(x, y, height) ||
        visibleTop(x, y, height)
    );
}

const visibleTrees = map.reduce((total, row, y) => {
    const visibleInRow = row.reduce((rowTotal, tree, x) => {
        if (visible(x, y, tree)) {
            rowTotal++;
        }

        return rowTotal
    }, 0);

    return total + visibleInRow;
}, 0);

showAns(visibleTrees);