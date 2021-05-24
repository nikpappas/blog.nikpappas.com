const pageRender = require("./pageRender");
const {
    cards,
    Body,
    header,
    head
} = require("./index.page");



function getContent() {
    return header() + Body(cards.filter(x => {
        return x.attributes.className.match('all') || x.attributes.className.match('electronics');
    }), 2);

}

function render() {
    const content = getContent();

    pageRender.render("./intermediate/electronics.html", content, head("Electronics | Nikolaos Pappas' Blog",
        "The electronics section of a blog with a variety of topics from electronics to visualisation. It's a gallery of personal projects aiming to inspire.",
        "https://blog.nikpappas.com/images/social/game-of-life.jpg"
    ));
}

module.exports = {
    render: render
}