const {
    SECTION,
    DIV,
    ARTICLE,
    H2,
    P,
} = require('../HtmlTags');
const {
    createElement,
    Component
} = require('../HtmlUtils');
const pageRender = require('../pageRender');
const {
    postHead,
    Banner,
    GithubRepoLink,
    Corrections
} = require('./post');



function getContent() {
    return createElement(DIV, [
        Banner('/images/processing-intellij-banner.jpg', 'Processing sketches in an ide'),
        Component(SECTION, [
            GithubRepoLink('https://github.com/nikpappas/processing-gradle-bootstrap'),
            Component(H2, "Context"),
            Component(ARTICLE, [
                Component(P, `
                <a href="https://processing.org/" target="blank">Processing</a> has been a very nice effort to make all this java swing nonsense accesible to anyone.
                Kudos to the team, honestly.
                The editing software, though, I have found lacking and frustrating. I found this as something quite normal
                since it's an open source initiattive and priorities have been elsewhere (ie make the library more robust than implement nice-to-have features for the editor).
                `),
                Component(P, `
                Now imagine you can harvest botht the powers given to you by the Processing library and an awesome IDE (in this case I've chosen IntelliJ community eddition) using the processing library in a 
                <a href="https://github.com/nikpappas/processing-gradle-bootstrap" target="blank">gradle project</a>.
                `)
            ]),
            Corrections,
        ], {
            className: 'post content'
        })
    ]);
}

async function render() {
    const content = getContent();
    await pageRender.render("./intermediate/post/processing-sketches-in-an-ide.html", content, postHead({
        title: 'Processing sketches in an IDE',
        description: 'A java (gradle) bootstrap project to allow developers to harness the power of both processing and that of an IDE.',
        imageUrl: 'https://blog.nikpappas.com/images/social/processing-intellij.jpg'
    }, `
    <meta property="og:url" content="https://blog.nikpappas.com/post/processing-sketches-in-an-ide.html" />        
    <meta name="keywords" content="processing,programming,iintellij" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="600" />
    `));
}


module.exports = {
    render: render
}