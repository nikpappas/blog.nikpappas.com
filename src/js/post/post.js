const {
    Component
} = require('../HtmlUtils');

const {
    H1,
    H2,
    DIV,
    PICTURE,
    IMG,
    ANCHOR,
    SECTION,
    P,
} = require('../HtmlTags');

function postHead({
    title,
    description,
    imageUrl
}, extra) {
    const base = `
    <title>${title}</title>
    <meta content="${title}" property="og:title" />
    <meta content="${title}" property="twitter:title" />

    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#0e3f38" />
    <meta name="description" content="${description}">
    <meta property="og:description" content="${description}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="twitter:image" content="${imageUrl}" />
    <meta content="summary_large_image" name="twitter:card" />

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
        }),
        Component(ANCHOR, "←", {
            href: "/",
            className: "back-to-main content"
        }),
    ], {
        className: 'post-banner'
    });

}

function GithubRepoLink(url) {
    return Component(ANCHOR, [
        Component(IMG, '', {
            src: '/images/GitHub-Mark-32px.png',
            alt: "Github repository",
        })
    ], {
        href: url,
        target: "blank",
        className: 'img-link',
    })
}

const Corrections = Component(SECTION, [
    Component(H2, "Comments"),
    Component(P,
        `Because a blog without feedback would be lifeless, for any ideas corrections or any kind of comment, I'm happy to have your e-mails at <a href="mailto:hello@nikpappas.com">hello@nikpappas.com</a>`,
    )
]);

module.exports = {
    postHead,
    Banner,
    GithubRepoLink,
    Corrections,
}