const fs = require("fs");
const path = require("path");
const GitClient = require("./git/client");
const {InitCommand,CatFileCommand} = require('./git/commands')
const gitClient = new GitClient();

const command = process.argv[2];

switch(command){
    case "init":
        handleInitCommand();
        break;
    case "cat-file":
        handleCatFileCommand();
        break;
    default:
        throw new Error(`Unknown command ${command}`);
}

function handleInitCommand(){
    const initCommand = new InitCommand();
    gitClient.run(initCommand)
}

function handleCatFileCommand(){
    const flag = process.argv[3];
    const  commitHash = process.argv[4];
    const catFileCommand = new CatFileCommand(flag,commitHash);
    gitClient.run(catFileCommand)
}
