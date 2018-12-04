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

// Write a helper for coverting the entry into a real date
const dateRegex = /^\[(.+)\]/;
const getDate = entry => new Date(entry.match(dateRegex)[1]);

// Sort the entries by date
const chronoEntries = inputArray.sort((a, b) => getDate(a) - getDate(b));

const guards = {};
let curr = false;
let sleeps = false;

// Loop through the entries and add the data to a 'guard' key
chronoEntries.forEach(entry => {
  const newGuard = entry.match(/#(\d+)/);
  if (entry.split(" ")[2] === "Guard") {
    curr = newGuard[1];
  } else {
    if (entry.split(" ")[2] === "falls") {
      // Create a blank object for the guard if necessary
      guards[curr] = guards[curr] || {};
      // Make a note of the start time
      sleeps = getDate(entry);
    } else {
      // Calculate the duration from the time difference
      const duration = (getDate(entry) - sleeps) / 60000;

      // Get the minute that the guard woke up
      const wakes = Number(entry.match(dateRegex)[1].split(":")[1]) - 1;

      // For every minute of the duration that the guard was a sleep add a record to storage
      for (let i = 0; i < duration; i++) {
        const minute = wakes - i;
        guards[curr][minute] = (guards[curr][minute] || 0) + 1;
      }
    }
  }
});

// Helper function to return the modal frequency for a guard
const getModeFrequencyForGuard = guard => {
  return Math.max(...Object.values(guards[guard]));
};

// Get the guard with the highest frequency in one minute
const guardWithModeFrequency = Object.keys(guards).sort(
  (a, b) => getModeFrequencyForGuard(b) - getModeFrequencyForGuard(a)
)[0];

// Get that minute for the guard with the highest frequency
const modalMinute = Object.keys(guards[guardWithModeFrequency]).sort((a, b) => {
  return guards[guardWithModeFrequency][b] - guards[guardWithModeFrequency][a];
})[0];

// Return the checksum
showAns(Number(guardWithModeFrequency) * Number(modalMinute));
