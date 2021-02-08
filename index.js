const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

console.log("Hello, you are about to generate a readme.md for your project");

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your Project title?",
      name: "projectTitle",
    },
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "userName",
    },
    {
      type: "input",
      message: "What is the description of your project?",
      name: "description",
    },
    {
      type: "input",
      message: "Enter the installation instructions for your project",
      name: "instructions",
    },
    {
      type: "input",
      message: "Enter your the application usage information",
      name: "usage",
    },
    {
      type: "input",
      message: "Contributors to this project",
      name: "contributions",
    },
    {
      type: "list",
      message: "Please choose a license for your project",
      name: "license",
      choices: [
        "Apache",
        "MIT",
        "Academic Free License v3.0",
        "Open Software License 3.0",
      ],
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
  ]);
}

function createMarkDown(answers) {
  return `

  ![badge](https://img.shields.io/badge/license-${answers.license}-brightgreen)

  # Project Title
  ${answers.projectTitle}

  ## Table of contents
  + [Description](#description)

  + [Instructions](#instructions)

  + [Usage](#usage)

  + [Contributions](#contributions)

  + [License](#license)

  + [Questions](#questions)

  ## Description
  ${answers.description}

  ## Instructions
  Initiate the project by entering in the following command..
  ${answers.instructions}

  ## Usage
  ${answers.usage}

  ## License
  This application uses the ${answers.license} license.

  ## Contributors
  ${answers.contributions}

  ## Questions
  ${answers.userName}
  <br />
  You can contact me on my GitHub account at (https://github.com/bcrisp084)
  <br />
  You may can reach me by sending me an email at ${answers.email} `;
}
promptUser()
  .then(function (answers) {
    const md = createMarkDown(answers);
    return writeFileAsync("generateREADME.MD", md);
  })
  .then(function () {
    console.log("Success");
  })
  .catch(function (err) {
    console.log(err);
  });
