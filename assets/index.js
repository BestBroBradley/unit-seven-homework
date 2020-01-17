const fs = require("fs")
const axios = require("axios")
const inquirer = require("inquirer")
const util = require("util")
const generateHTML = require("./generateHTML")

const writeFileAsync = util.promisify(fs.writeFile)

let color
let githubUser
let apiResponse
let stars = 0;

function promptUser() {
    inquirer.prompt([
        {
            type: "list",
            name: "color",
            choices: ["Green", "Blue", "Pink", "Red"],
            message: "What is your favorite color?"
        },
        {
            type: "input",
            name: "githubUser",
            message: "What is your GitHub username?"
        }
    ]).then (function(userData) {
        color = userData.color;
        githubUser = userData.githubUser
        const queryUrl = `https://api.github.com/users/${githubUser}`
        const queryUrl2 = `https://api.github.com/users/${githubUser}/repos`
        axios
            .get(queryUrl)
            .then (function (response) {
                apiResponse = response 
                console.log(apiResponse)
            }) 
        axios
            .get(queryUrl2)
            .then (function (repoData) {
                for (const datum of repoData.data) {
                    stars += datum.stargazers_count
                }
            }) .then (function () {
                console.log(apiResponse) 
                const html = generateHTML.makeMyHTML(apiResponse, color, stars)
                writeFileAsync(`${githubUser}.html`, html).then(function() {
                    console.log(`"Successfully wrote to ${githubUser}.html file"`);
                  });
        })
    })
}
    promptUser()
