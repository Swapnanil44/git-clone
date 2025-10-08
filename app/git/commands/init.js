const fs = require("fs");
const path = require("path");
class InitCommand{
    execute(){
        // create .git folder
        fs.mkdirSync(path.join(process.cwd(),'.git'),{recursive: true});
        // create .git/objects folder
        fs.mkdirSync(path.join(process.cwd(),'.git','objects'),{recursive: true});
        // create .git/refs folder
        fs.mkdirSync(path.join(process.cwd(),'.git','refs'),{recursive: true});
        // create .git/HEAD file and write ref: refs/heads/main\n in it
        fs.writeFileSync(path.join(process.cwd(),'.git','HEAD'),'ref: refs/heads/main\n')

        process.stdout.write(`Initialized empty Git repository in ${path.join(process.cwd(),'.git')}`)
    }
}

module.exports = InitCommand