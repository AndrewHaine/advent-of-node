import util from "util";
import colors from "colors";

const dump = contents => {
  console.log(util.inspect(contents, true, 5));
};

const showAns = answer => {
  console.log(`The answer is: ${colors.bold.yellow(String(answer))}`);
};

export { dump, showAns };