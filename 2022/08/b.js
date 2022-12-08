/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const inputArray = input.split("\n");

const map = inputArray.map(row => row.split(''));

const calculateViewDistance = (trees, height) => {
    const blockingTreeIndex = trees.findIndex(tree => tree >= height);

    if (trees.length === 0) {
        return 0;
    }

    return blockingTreeIndex > -1 ? blockingTreeIndex + 1 : trees.length;
}

const distanceTop = (x, y, height) => {
    const treesToCheck = map.slice(0, y)
        .reverse()
        .map(row => row[x]);

    return calculateViewDistance(treesToCheck, height);
}

const distanceLeft = (x, y, height) => {
    const treesToCheck = map[y]
        .slice(0, x)
        .reverse();

    return calculateViewDistance(treesToCheck, height);
}

const distanceRight = (x, y, height) => {
    const treesToCheck = map[y]
        .slice(x + 1, map[y].length);

    return calculateViewDistance(treesToCheck, height);
}

const distanceBottom = (x, y, height) => {
    const treesToCheck = map.slice(y + 1, map.length)
        .map(row => row[x]);

    return calculateViewDistance(treesToCheck, height);
}

const score = (x, y, height) => {
    const distances = [
        distanceTop(x, y, height),
        distanceLeft(x, y, height),
        distanceRight(x, y, height),
        distanceBottom(x, y, height),
    ];

    return distances.reduce((total, distance) => {
        return total * distance;
    }, 1);
}

const scores = map.reduce((totalScores, row, y) => {
    const rowScores = row.map((tree, x) => {
        return score(x, y, tree);
    });

    return [...totalScores, ...rowScores];
}, []);

const sortedScores = scores.sort((a, b) => b - a);

showAns(sortedScores.at(0));