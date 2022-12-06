/**
 * Advent of code solution
 * @Andrew_Haine
 */

 import fs from 'fs';
 import { showAns, dump } from "../../utils/index.js";

 const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");
 const inputArray = input.split("\n");

dump(inputArray);