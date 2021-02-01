import { prompt } from "inquirer";
import { writeFile } from "fs";
const axios = require("axios").default;

prompt([
  {
    type: "input",
    message: "What is your user name?",
    name: "username",
  },
  {
    type: "input",
    message: "What is your location?",
    name: "Location",
  },
  {
    type: "input",
    message: "Enter a bio about yourself:",
    name: "bio",
  },
  {
    type: "input",
    message: "Enter your linkedin url:",
    name: "Linkedin",
  },
  {
    type: "input",
    message: "Enter your GitHub url:",
    name: "GitHub",
  },
]).then((response) => {
  // const data = response;
  writeFile(`index.html`, buildHTML(response), (err) =>
    err ? console.log(err) : console.log("sucess")
  );
});

// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
