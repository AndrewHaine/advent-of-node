/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const showAns = require("../../utils/index").showAns;
const dump = require("../../utils/index").dump;
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const [string, playerCount, lastVal] = /^(\d+) .+ (\d+) points$/g
  .exec(input)
  .map(Number);

const players = {};

let current = { value: 0 };
current.prev = current;
current.next = current;
let currPlayer = 1;

for (let marble = 1; marble <= lastVal * 100; marble++) {
  if (marble % 23 === 0) {
    players[currPlayer] = (players[currPlayer] || 0) + marble;
    let target = current;

    for (let i = 0; i < 7; i++) {
      target = target.prev;
    }

    players[currPlayer] += target.value;
    target.next.prev = target.prev;
    target.prev.next = target.next;
    current = target.next;
  } else {
    let target = current.next;
    let newMarble = { value: marble, prev: target, next: target.next };
    target.next.prev = newMarble;
    target.next = newMarble;
    current = newMarble;
  }

  currPlayer = (currPlayer % playerCount) + 1;
}

const highScore = Math.max(...Object.values(players));

showAns(highScore);
