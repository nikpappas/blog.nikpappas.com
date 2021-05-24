const pageRender = require("./pageRender");
const {
    header,
    head,
} = require("./index.page");
const { Component, Img, createElement } = require("./HtmlUtils");
const { DIV } = require("./HtmlTags");



function getContent() {
    return header() + createElement(DIV, [
        Component(DIV, 'Sorry the dog ate the page you were looking for...'),
        Component(DIV, 'Go to the <a href="https://blog.nikpappas.com">home page</a> isntead?'),
        Img({src:"/images/dog-homework.jpg", alt:'Dog'}),
    ], {className: 'notfound'});

}



function render() {
    const content = getContent();

    pageRender.render("./intermediate/notFound.html", content, head("Processing | Nikolaos Pappas' Blog",
        "A section deticated to Processing, of a blog with a variety of topics from electronics to visualisation. It's a gallery of personal projects aiming to inspire.",
        "https://blog.nikpappas.com/images/social/game-of-life.jpg"
    ));
}

module.exports = {
    render: render
}