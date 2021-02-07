const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "userName",
    },
    {
      type: "input",
      message: "What is your Project title?",
      name: "projectTitle",
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
      type: "input",
      message: "Enter the project test information",
      name: "testing",
    },
    {
      type: "input",
      message: "Please choose a license for your project",
      name: "license",
      checkbox: [
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

getUserData = async (answers) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=repo:${answers.username}/${answers.repo}`
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

function createMarkDown(answers) {
  return `
  <img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
  # ${answers.userName}

  ## Project Title
  ${answers.projectTitle}

  ## Table of contents
  + [Description](#description)

  + [Instructions](#instructions)

  + [Usage](#usage)

  + [Contributions](#contributions)

  + [Testing](#testing)

  + [License](#license)

  + [Email](#email)

  ## Instructions
  Initiate the project by entering in the following command..
  ${answers.instructions}

  ## Usage
   ${answers.usage}

  ## License
   ${answers.license}

  ## Contributors
   ${answers.contributions}

  ## Tests
   ${answers.testing}

   ## Email
   ${answers.email} `;
}
promptUser()
  .then(function (answers) {
    const md = createMarkDown(answers);
    return writeFileAsync("README.md", md);
  })
  .then(function () {
    console.log("Success");
  })
  .catch(function (err) {
    console.log(err);
  });
