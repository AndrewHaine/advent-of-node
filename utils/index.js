const util = require("util");
const colors = require("colors");

exports.dump = contents => {
  console.log(util.inspect(contents));
};

exports.showAns = answer => {
  console.log(`The answer is: ${String(answer).bold.yellow}`);
};
