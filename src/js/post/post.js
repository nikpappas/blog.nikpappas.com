const {
    Component
} = require('../HtmlUtils');

const {
    H1,
    DIV,
    PICTURE,
    IMG,
    ANCHOR,
} = require('../HtmlTags');

function postHead(extra) {
    const base = `
    <meta property="og:type" content="article" />
    <link rel="preload" href="/post.css" as="style">
    <link rel="stylesheet" href="/post.css">
    `;
    if (extra) {
        return extra + base;
    }
    return base;

}



function Banner(imgSrc, title) {
    return Component(DIV, [
        Component(PICTURE, [
            Component(IMG, '', {
                src: imgSrc,
                alt: title,
            })
        ]),
        Component(H1, title, {
            className: 'post-title'
        })
    ], {
        className: 'post-banner'
    });

}

function GithubRepoLink(url) {
    return Component(ANCHOR, [
        Component(IMG, '', {
            src: '/images/GitHub-Mark-32px.png',
            alt: "Github repository"
        })
    ], {
        href: url,
        target:"blank"
    })
}

module.exports = {
    postHead,
    Banner,
    GithubRepoLink,
}