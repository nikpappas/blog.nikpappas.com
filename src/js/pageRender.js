const fs = require('fs');
const {
    createDirIfNotExists,
    getParentDir
} = require('../renderUtils');

function render(outFile, body, head) {
    const template = fs.readFileSync('src/client/index.html', 'utf8');

    const out = template.replace("${BODY}", body)
        .replace("${HEAD}", head);
    const parentDir = getParentDir(outFile);
    createDirIfNotExists(parentDir);
    console.log("Writing file", outFile);
    fs.writeFileSync(outFile, out);

}

module.exports = {
    render: render
}