const pageRender = require("./pageRender");
const {
    Body,
    header,
    cards,
    head
} = require("./index.page");



function getContent() {
    return header() + Body(cards.filter(x => {
        return x.attributes.className.match('all') || x.attributes.className.match('music');
    }), 1);

}



function render() {
    const content = getContent();

    pageRender.render("./intermediate/music.html", content, head("Music | Nikolaos Pappas' Blog",
        "The music section of a blog with a variety of topics from electronics to visualisation. It's a gallery of personal projects aiming to inspire.",
        "https://blog.nikpappas.com/images/social/game-of-life.jpg",
        "https://blog.nikpappas.com/music",
    ));
}

module.exports = {
    render: render
}