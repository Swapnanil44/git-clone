const fs = require("fs");
const path = require("path");
class GitClient{
    run(command){
        command.execute()
    }
}

module.exports = GitClient