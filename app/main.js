const fs = require("fs");
const path = require("path");
const GitClient = require("./git/client");
const {InitCommand} = require('./git/commands')
const gitClient = new GitClient();

const command = process.argv[2];

switch(command){
    case "init":
        handleInitCommand();
        break;
    default:
        throw new Error(`Unknown command ${command}`);
}

function handleInitCommand(){
    const initCommand = new InitCommand();
    gitClient.run(initCommand)
}
