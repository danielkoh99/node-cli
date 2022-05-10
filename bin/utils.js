const chalk = require('chalk');
const boxen = require('../node_modules/boxen/index')
const fs = require('fs')
const commands = require('./commands.json')
const templates = require('../templates/templates.json')
var inquirer = require('inquirer');
const usage = "\nUsage: " + "~$" + chalk.blue(" <command>") + chalk.blueBright("[options]");
function checkCommand(command, filename) {
    console.log(command)

    if (command === 'cf') {
        if (filename && filename.includes('.')) {
            createFile(filename)
        } else {
            console.log(chalk.red("Please specify an extension"))
        }
    }

    if (command === 'df') {
        deleteFile(filename)
    }
    if (command === 'ctf') {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'framework',
                    message: 'Which template to create?',
                    choices: [
                        'React',
                        'Vue',
                    ],
                },
            ])
            .then((answers) => {

                templates.filter(template => {
                    if (template.name === answers.framework.toLowerCase()) {
                        template.template.filter((string, index) => {
                            if (string.length === 0) {
                                template.template[index] = filename
                            }
                        })
                        createFile(filename + template.extension, template.template.join('\n'))
                    }
                })
                console.log(JSON.stringify(answers.framework, null, '  '));
            });
        // console.log("Creating template file")
    }

}
function showHelp() {

    console.log(boxen(
        chalk.green("Options:") + "\n" +
        '--version   ' + 'Show version number' + "\n" +
        '--commands  ' + 'List all commands' + "\n" +
        '--help      ' + 'Show help', { padding: 1, borderColor: 'green', dimBorder: true }) + "\n")


}
function showAll() {

    commands.forEach(command => {
        console.log(boxen(
            chalk.green("Action:") + chalk.yellow(command.name) + ' Command:' + chalk.bold.yellow(command.command) + chalk.red(command.usage), { padding: 1, borderColor: 'green', dimBorder: true }) + "\n")

    })
}

async function createFile(fileName, fileData) {
    fs.writeFile(fileName, fileData, (err) => {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}
function deleteFile(file) {
    fs.unlink(file, (err => {
        if (err) console.log(err);
        else {
            console.log("\nDeleted file:" + file);
        }
    }));
}
function renameFile(fileName, newName) {
    fs.rename(fileName, newName, () => {
        if (err) throw err;
        console.log('file renamed from:' + fileName + "to:" + newName)
    })
}
module.exports = { checkCommand: checkCommand, showHelp: showHelp, showAll: showAll, createFile: createFile, deleteFile: deleteFile }
