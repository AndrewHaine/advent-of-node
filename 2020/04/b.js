/**
 * Advent of code solution
 * @Andrew_Haine
 */

const fs = require("fs");
const path = require("path");
const { showAns, dump } = require("../../utils/index");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n\n");

const passports = inputArray.map(block => block.split('\n').join(' '));

const isValid = block => {
  const pBlock = {};
  block.split(' ').forEach(field => {
    const [key, value] = field.split(':');
    pBlock[key] = value;
  });

  const keys = Object.keys(pBlock);

  const validKeys = keys.length === 8 || (keys.length === 7 && !keys.includes('cid'));

  if(!validKeys) return false;

  const byr = pBlock['byr'].length === 4 && Number(pBlock['byr']) >= 1920 && Number(pBlock['byr']) <= 2002;
  const iyr = pBlock['iyr'].length === 4 && Number(pBlock['iyr']) >= 2010 && Number(pBlock['iyr']) <= 2020;
  const eyr = pBlock['eyr'].length === 4 && Number(pBlock['eyr']) >= 2020 && Number(pBlock['eyr']) <= 2030;
  const hcl = /^(#([a-f0-9]){6})$/.test(pBlock['hcl']);
  const ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(pBlock['ecl']);
  const pid = /^(([0-9]){9})$/.test(pBlock['pid']);

  const hgtMatch = pBlock['hgt'].match(/^(\d+)(cm|in)/);
  if(!hgtMatch) return false;

  const inMatch = hgtMatch[2] === 'in' && (Number(hgtMatch[1]) >= 56 && Number(hgtMatch[1]) <= 76);
  const cmMatch = hgtMatch[2] === 'cm' && (Number(hgtMatch[1]) >= 150 && Number(hgtMatch[1]) <= 193);

  const hgt = inMatch || cmMatch;

  return byr && iyr && eyr && hcl && ecl && pid && hgt;
};

const validPassports = passports.filter(p => isValid(p));

showAns(validPassports.length);