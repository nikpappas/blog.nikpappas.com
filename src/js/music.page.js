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
    <title>Nikos' Blog -- Music</title>
    <link rel="stylesheet" href="/post.css">

    <meta name="keywords" content="blog,processing,Nikolaos, Pappas, visualisation, visualization, music, project, programming, synthesizer" />
    `;
}

function getContent() {
    return createElement(DIV, [
        Banner('/images/music.jpg', 'Music'),
        Component(P, "Lorem ispussdnalsknd  sodna osidn oaimsdkamnsodin aosidjoaisjd oaisj.Lorem ispussdnalsknd  sodna osidn oaimsdkamnsodin aosidjoaisjd oaisj.", {
            className: 'content'
        }),
        Component(SECTION, [
            Component(DIV, [
                card("Analog Synthesizer", "/post/analog-synthesizer.html", "images/visualisation.jpg", 'flex-1'),
                card("Java Synthesizer", "/post/digital-java-synthesizer.html", "images/DigitalJavaSynth.jpg", 'flex-2'),
            ].join(""), {
                className: 'cards-wrapper content'
            })
        ])
    ]);

}



function render() {
    const content = getContent();

    pageRender.render("./intermediate/music.html", content, head());
}

module.exports = {
    render: render
}