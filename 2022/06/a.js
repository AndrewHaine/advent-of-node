/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const allCharsUnique = input => {
  let chars = new Set();
  for(const char of input) {
    if (chars.has(char)) {
      return false;
    }
    chars.add(char);
  }
  return true;
}

const findTimeMarker = input => {
  let i = 4;
  let found = false;

  while (!found) {
    const str = input.substring(i, i - 4);

    if (allCharsUnique(str)) {
      found = true;
    }

    i++;
  }

  return i - 1;
}

const position = findTimeMarker(input);

showAns(position);

