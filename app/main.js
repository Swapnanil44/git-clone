const fs = require("fs");
const path = require("path");
const GitClient = require("./git/client");
const {InitCommand,CatFileCommand,HashObjectCommand} = require('./git/commands')
const gitClient = new GitClient();

const command = process.argv[2];

switch(command){
    case "init":
        handleInitCommand();
        break;
    case "cat-file":
        handleCatFileCommand();
        break;
    case "hash-object":
        handleHashObjectCommand();
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

function handleHashObjectCommand(){
    let flag = process.argv[3];
    let filePath = process.argv[4];
    if(!filePath){
        filePath = flag;
        flag = null;
    }
    const hashObjectCommand = new HashObjectCommand(flag,filePath);
    gitClient.run(hashObjectCommand);
}