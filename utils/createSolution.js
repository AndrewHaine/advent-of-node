const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const yaml = require("js-yaml");
const fsExtra = require("fs-extra");
const colors = require("colors");

const settings = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, "../settings.yaml"))
);

inquirer
  .prompt([
    {
      name: "year",
      type: "list",
      message: "Select the year to create a solution for:",
      choices() {
        return settings.years;
      }
    },
    {
      name: "day",
      type: "list",
      message: "Select the day of month for this solution:",
      choices() {
        return Array(25)
          .fill()
          .map((i, j) => {
            return j < 10 ? `0${j}` : `${j}`;
          })
          .filter(i => i !== "00");
      }
    }
  ])
  .then(answers => {
    // Create the year directory
    const yearDir = path.join(__dirname, `../${answers.year}`);
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir);
    }

    // Create the day directory
    const dayDir = path.join(yearDir, `/${answers.day}`);
    if (fs.existsSync(dayDir)) {
      return console.error(
        `A solution already exists for December ${answers.day} ${answers.year}!`
          .bold.red
      );
    }

    // Create the solution from the template
    fs.mkdirSync(dayDir);
    fsExtra.copySync(`${path.join(__dirname, "_template")}`, dayDir);

    // Append a common header template
    const header = fs.readFileSync(path.join(__dirname, "header.js"));
    ["a", "b"].forEach(solutionFile => {
      fs.appendFile(path.join(dayDir, `${solutionFile}.js`), header, e => {
        if (e)
          return console.error(`There was an error creating the header: ${e}`);
      });
    });
  });
