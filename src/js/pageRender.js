const fs = require('fs');

function render(outFile, body, head) {
    const template = fs.readFileSync('src/client/index.html', 'utf8');

    const out = template.replace("${BODY}", body)
        .replace("${HEAD}", head);

    fs.writeFileSync(outFile, out);

}

module.exports = {
    render: render
}