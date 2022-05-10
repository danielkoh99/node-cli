#! /usr/bin/env node

const yargs = require("yargs");
const utils = require("./utils");
const chalk = require('chalk');
const commands = require('./commands.json')
var inquirer = require('inquirer');

const usage = "\nUsage: " + "~$" + chalk.blue(" <command>") + chalk.blueBright("[options]");
// const boxen = require("boxen")
let fileName = ''
const options = yargs
    .usage("\nUsage: " + "~$" + chalk.blue(" <command>") + chalk.blueBright("[options]"))
    // .alias('l', 'commands')
    .option("c", {
        alias: "commands",
        describe: "List all commands",
        type: "boolean",
        demandOption: false
    })
    .help(true)
    .argv;

if (yargs.argv.commands === true) {

    utils.showAll()
    return
}

if (yargs.argv._[0]) {
    let arg = yargs.argv._[0]
    let name = yargs.argv._[1]
    if (!name) {
        console.log(chalk.redBright("No filename specified"))
    }
    commands.filter(command => {
        if (arg === command.command) {
            utils.checkCommand(command.command, name)
            return
        }
    })

}

if (yargs.argv._[0] == null) {
    utils.showHelp()
    return
}