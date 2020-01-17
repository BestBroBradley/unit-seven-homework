const fs = require("fs")
const axios = require("axios")
const inquirer = require("inquirer")
const util = require("util")
const generateHTML = require("./generateHTML")
const pdf = require('html-pdf');

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
                } console.log(stars)
            })
        .then (function () {
                console.log(apiResponse) 
                const html = generateHTML.makeMyHTML(apiResponse, color, stars)
                writeFileAsync(`${githubUser}.html`, html).then(function() {
                    console.log(`"Successfully wrote to ${githubUser}.html file"`);
                    const file = fs.readFileSync(`./${githubUser}.html`, 'utf8')
                    var options = { format: 'Tabloid'};
 
                    pdf.create(html, options).toFile(`./${githubUser}.pdf`, function(err, res) {
                        if (err) return console.log(err);
                        console.log(res); // { filename: '/app/businesscard.pdf' }
                    });
                  });
        })
    })
}
    promptUser()