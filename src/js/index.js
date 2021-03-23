const pageRender = require('./pageRender');

function head() {
    return "";
}

const banner = (body) =>
    createElement('section', body)

function createElement(tag, body) {
    return `<${tag}>${body}</${tag}>`



}

function card(title, url) {
    return `
    <div>
        <a href="${url}">
            <h2>${title}</h2>
        </a>
    </div>
    `;
}



function render() {
    const cards = [
        card("Music", "music.html"),
        card("Visualisation", "visualisation.html"),
    ].join("");
    const out = banner('<h1>Projects</h1>' + cards)
    pageRender.render("intermediate/index.html", out, head())

}

module.exports = {
    render: render
}