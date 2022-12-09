/**
 * Advent of code solution
 * @Andrew_Haine
 */

import fs from 'fs';
import Directory from './lib/Directory.js';
import { showAns, dump } from "../../utils/index.js";

const input = fs.readFileSync(new URL('input.txt', import.meta.url), "utf8");

const commands = input.split("\n");

let currentDirectory = null;

const parseLine = line => {
  if (line.startsWith('$ cd')) {
    const [o, name] = line.match(/\$ cd ([a-z\.\/]+)/);

    if (name === '..') {
      currentDirectory = currentDirectory.parent;
    } else {
      if (currentDirectory) {
        let existingDirectory = currentDirectory.directories[name] ?? null;

        if (existingDirectory) {
          currentDirectory = existingDirectory;
        } else {
          currentDirectory = new Directory(name, currentDirectory);
        }
      } else {
        currentDirectory = new Directory(name, null);
      }
    }
  }

  if (line.startsWith('dir')) {
    const [o, name] = line.match(/dir ([a-z]+)/);
    if (!currentDirectory.directories[name]) {
      const newDir = new Directory(name, currentDirectory);
      currentDirectory?.addDirectory(newDir);
    }
  }

  const fileRegExp = /([0-9]+) ([a-z\.]+)/;
  if (!!line.match(fileRegExp)) {
    const [o, size, name] = line.match(fileRegExp);
    currentDirectory.addFile(name, size);
  }
}

// Generate our structure
commands.forEach(line => parseLine(line));

// Find the root directory
let root = currentDirectory;

while(root.parent) {
  root = root.parent;
}

const directoriesToWalk = [root];
const allDirectories = [];

while(directoriesToWalk.length) {
  const searching = directoriesToWalk.shift();
  allDirectories.push(searching);
  Object.values(searching.directories).forEach(toAdd => directoriesToWalk.push(toAdd));
}

const getDirectorySize = directory => {
  const fileSize = Object.values(directory.files).reduce((total, fileSize) => total + fileSize, 0);
  const subDirectorySize = Object.values(directory.directories).reduce((total, subDirectory) => total + getDirectorySize(subDirectory), 0);
  return fileSize + subDirectorySize;
}

const directoriesOfSize = allDirectories.filter(directory => {
  return getDirectorySize(directory) <= 100000;
});

const totalSize = directoriesOfSize.reduce((total, directory) => {
  return total + getDirectorySize(directory);
}, 0);

showAns(totalSize);