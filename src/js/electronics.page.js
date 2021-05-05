const pageRender = require("./pageRender");
const {
    createElement,
    Component
} = require('./HtmlUtils');
const {
    DIV,
    SECTION,
    P
} = require("./HtmlTags");
const {
    card,
} = require("./index.page");
const {
    Banner
} = require("./post/post");


function head() {
    return `
    <title>Nikos' Blog -- Electronics</title>
    <link rel="stylesheet" href="/post.css">

    <meta name="keywords" content="blog,Nikolaos, Pappas, music, project, synthesizer" />
    `;
}

function getContent() {
    return createElement(DIV, [
        Banner('/images/visualisation.jpg', 'Electronics'),
        Component(P,"Lorem ispussdnalsknd  sodna osidn oaimsdkamnsodin aosidjoaisjd oaisj.Lorem ispussdnalsknd  sodna osidn oaimsdkamnsodin aosidjoaisjd oaisj.", {className:'content'}),
        Component(SECTION, [
            Component(DIV, [
                card("Analog Synthesizer", "/post/analog-synthesizer.html", "images/visualisation-thumb.jpg", 'flex-1'),
            ].join(""), {
                className: 'cards-wrapper content'
            })
        ])
    ]);

}

function render() {
    const content = getContent();

    pageRender.render("./intermediate/electronics.html", content, head());
}

module.exports = {
    render: render
}