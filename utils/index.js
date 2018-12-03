const util = require("util");

exports.dump = contents => {
  console.log(util.inspect(contents));
};

exports.showAns = answer => {
  console.log(`The answer is: ${answer}`);
};
