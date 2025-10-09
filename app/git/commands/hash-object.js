const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require('crypto')

class HashObjectCommand{
    constructor(flag,filePath){
        this.flag = flag;
        this.filePath = filePath;
    }
    execute(){
        //1. checking if the file exsists
        const filePath = path.resolve(this.filePath);
        if(!fs.existsSync(filePath)){
            throw new Error(`fatal: could not open ${filePath} for reading: No such file or directory`);
        }
        //2. reading the file content
        const fileContent = fs.readFileSync(filePath);
        const fileSize = fileContent.length;
        //3. creating the blob
        const blobHeader = `blob ${fileSize}\0`;
        const blob = Buffer.concat([Buffer.from(blobHeader),fileContent]);
        //4. creating the hash
        const hash = crypto.createHash('sha1').update(blob).digest('hex');
        //5. write if the -w flag exsists
        if(this.flag && this.flag == '-w'){
            const folder = hash.slice(0,2);
            const file = hash.slice(2);
            const folderPath = path.join(process.cwd(),'.git','objects',folder);
            fs.mkdirSync(folderPath,{recursive: true});
            const compressedContent = zlib.deflateSync(blob);
            fs.writeFileSync(path.join(folderPath,file),compressedContent);
        }
        process.stdout.write(hash);
    }
}

module.exports = HashObjectCommand;