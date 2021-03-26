const {
    DIV,
    ANCHOR,
    H2,
    IMG,
    PICTURE,
} = require('./HtmlTags');
const {
    createElement,
    Component
} = require('./HtmlUtils');
const pageRender = require('./pageRender');

function head() {
    return `
    <meta name="keywords" content="blog,processing,Nikolaos, Pappas, visualisation, visualization, music, project, programming" />
    `;
}

const banner = (body) =>
    createElement('section', body)


function card(title, url, backgroundUrl, flexClass) {
    return createElement(DIV,
        [Component(ANCHOR,

            [Component(PICTURE, [Component(IMG, '', {
                    src: backgroundUrl,
                    alt: title,
                    className: 'card-img',
                })]),
                Component(DIV, [Component(H2, title)], {
                    className: "card-title"
                })
            ], {
                href: url
            })], {
            className: `card ${flexClass}`,
        });
}



function render() {

    const cards = createElement(DIV, [
        card("Music", "music.html", "images/music.jpg", 'flex-1 not-ready-card'),
        card("Visualisation", "/visualisation.html", "images/visualisation.jpg", 'flex-2 not-ready-card'),
        card("Electronics", "/electronics.html", "images/electronics.jpg", 'flex-2 not-ready-card'),
        card("Processing", "./processing.html", "images/processing.jpg", 'flex-1 not-ready-card'),
        card("Gravity Simulator", "/post/gravity-simulator.html", "images/gravity-simulator.jpg", 'flex-1'),
        card("Processing sketches in an IDE", "/post/processing-sketches-in-an-ide", "images/processing-intellij.jpg", 'flex-3'),
    ].join(""), {
        className: 'cards-wrapper content'
    });
    const out = banner('<h1>Projects</h1>' + cards)
    pageRender.render("intermediate/index.html", out, head())

}

module.exports = {
    render: render
}