const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
class CatFileCommand {
  constructor(flag, commitSHA) {
    this.flag = flag;
    this.commitSHA = commitSHA;
  }
  execute() {
    const flag = this.flag;
    const commitSHA = this.commitSHA;
    const filePath = path.join(
      process.cwd(),
      ".git",
      "objects",
      commitSHA.slice(0, 2),
      commitSHA.slice(2)
    );
    if (!fs.existsSync(filePath)) {
      throw new Error(`fatal: Not a valid object name ${filePath}`);
    }
    const contentBuffer = fs.readFileSync(filePath);
    const outputBuffer = zlib.inflateSync(contentBuffer);
    const nullByteIndex = outputBuffer.indexOf("\0");
    const header = outputBuffer.slice(0, nullByteIndex).toString();
    const [type, size] = header.split(" ");
    const content = outputBuffer.slice(nullByteIndex + 1);

    switch (flag) {
      case "-p": {
        process.stdout.write(content);
        break;
      }
      case "-t": {
        process.stdout.write(type);
        break;
      }
      case "-s":{
        process.stdout.write(size);
        break;
      }
      default:
        throw new Error(`Unknown flag: ${this.flag}`);
    }
  }
}

module.exports = CatFileCommand;
