const fs = require("fs")
const axios = require("axios")
const inquirer = require("inquirer")
const util = require("util")
const generateHTML = require("./generateHTML")

const writeFileAsync = util.promisify(fs.writeFile)

let color
let githubUser

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
    ]).then (function(data) {
        color = data.color;
        githubUser = data.githubUser
        const queryUrl = `https://api.github.com/users/${githubUser}`
        axios
            .get(queryUrl)
            .then (function (response) {
                console.log(response)
                const html = generateHTML.makeMyHTML(response, color)
                console.log(html)
            }) 
        })
    }
    
    promptUser()
    