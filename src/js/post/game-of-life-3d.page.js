const {
    DIV,
    H2,
    SECTION,
    ARTICLE,
    ANCHOR,
    P,
    CODE,
    FIGURE,
    FIGCAPTION,
    VIDEO,
} = require("../HtmlTags");

const {
    postHead,
    Banner,
    GithubRepoLink,
    Corrections
} = require('./post');


const {
    createElement,
    Component
} = require("../HtmlUtils");
const {
    typeset
} = require("../math");
const pageRender = require("../pageRender");

async function getContent() {
    const imgSrc = '/images/GOL6073.jpg';
    const title = 'Game of Life 3D';
    return createElement(DIV, [
        Banner(imgSrc, title),
        Component(SECTION, [
            // GithubRepoLink('https://github.com/nikpappas/gravity-simulator'),
            Component(H2, "Context"),
            Component(ARTICLE, [
                Component(P, `Under construction...`),

                Corrections

            ])
        ], {
            className: 'post content'
        })
    ]);

}



async function render() {
    const content = await getContent();
    const head = postHead({
            title: 'Game of Life 3D',
            description: 'A 3D take on the classic Game of Life',
            imageUrl: 'https://blog.nikpappas.com/images/social/game-of-life.jpg'
        },
        `
            <meta property="og:url" content="https://blog.nikpappas.com/post/gravity-simulator.html" />        
            <meta name="keywords" content="processing,mathematics,programming,games,nogames,game,life" />
            <meta property="og:image:width" content="1050" />
            <meta property="og:image:height" content="1050" />        
        `, )
    await pageRender.render("./intermediate/post/game-of-life-3d.html", content, head);
}

module.exports = {
    render: render
}