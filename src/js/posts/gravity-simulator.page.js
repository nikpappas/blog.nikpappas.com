const {
    DIV,
    IMG,
    H1,
    H2,
    PICTURE,
    SECTION,
    ARTICLE,
} = require("../HtmlTags");
const {
    createElement,
    Component
} = require("../HtmlUtils");
const pageRender = require("../pageRender");

const content = createElement(DIV, [
    Banner(),
    Component(SECTION, [ 
        Component(H2, "Why all this!"), 
        Component(ARTICLE, "Thist hasitaosf nsadosakndokasndo ans doias odihaso dihaos idhaos idhaos idhaos ihdao sihdo iashdo isahdo ashdo  asdi aho "),
        Component(H2, "How?"),
        Component(ARTICLE, "Tassacassasd doias odihaso dihaos idhaos idhaos idhaos ihdao sihdo iashdo isahdo ashdo  asdi aho "),
    ], {
        className: 'post content'
    })
]);


function Banner() {
    return Component(DIV, [
        Component(PICTURE, [
            Component(IMG, '', {
                src: '/images/gravity-simulator.jpg'
            })
        ]),
        Component(H1, 'Gravity Simulator', {
            className: 'post-title'
        })
    ], {
        className: 'post-banner'
    });

}

function head() {
    return `<link rel="preload" href="/post.css" as="style">
    <link rel="stylesheet" href="/post.css">`;
}

function render() {
    pageRender.render("./intermediate/posts/gravity-simulator.html", content, head());
}

module.exports = {
    render: render
}