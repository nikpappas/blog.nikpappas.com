const {
    DIV,
    H3,
    H2,
    H1,
    PICTURE,
    SECTION,
    HEADER,
} = require('./HtmlTags');
const {
    createElement,
    Component,
    A,
    Div,
    Img
} = require('./HtmlUtils');
const pageRender = require('./pageRender');

function head() {
    return `
    <title>Nikos' Blog</title>

    <meta name="keywords" content="blog,processing,Nikolaos, Pappas, visualisation, visualization, music, project, programming" />
    <meta name="description" content="Nikolaos Pappas' Blog.">
    `;
}

const Header = Component(HEADER, [
    Div([
        Div( [
            Img({
                src: '/images/logo-outer128.png',
                alt: `Nikolaos Pappas' logo`,
                style:'vertical-align:bottom',
                height:"94",
            }),
            Component(H1,'Nikolaos Pappas', {className:'index-logo-title'}),

        ], {
            className: 'header-left'
        }),
    ])
]);

const banner = (body) =>
    createElement(SECTION, body)


function card(title, url, backgroundUrl, flexClass) {
    return createElement(DIV,
        [A(
            [Component(PICTURE, [Img({
                    src: backgroundUrl,
                    alt: title,
                    className: 'card-img',
                    height: '200',
                    width: '250',
                    loading: 'lazy'
                })]),
                Div( [Component(H3, title)], {
                    className: "card-title"
                })
            ], {
                href: url
            })], {
            className: `card ${flexClass}`,
        });
}



function render() {

    const cards = createElement(DIV, [
        createElement(H2, "Categories", {
            className: "flex-full heading-main"
        }),
        card("Music", "music.html", "/images/music.jpg", 'flex-full'),
        card("Visualisation", "/visualisation.html", "/images/visualisation-thumb.jpg", 'flex-2 not-ready-card'),
        card("Electronics", "/electronics.html", "/images/electronics.jpg", 'flex-2'),
        card("Processing", "./processing.html", "/images/processing.jpg", 'flex-1'),
        createElement(H2, "Posts", {
            className: "flex-full heading-main"
        }),
        card("Gravity Simulator", "/post/gravity-simulator.html", "/images/gravity-simulator.jpg", 'flex-1'),
        card("Processing sketches in an IDE", "/post/processing-sketches-in-an-ide.html", "/images/processing-intellij.jpg", 'flex-3'),
        card("Analog Synthesizer", "/post/analog-synthesizer.html", "/images/visualisation-thumb.jpg", 'flex-2'),
        card("Java Synthesizer", "/post/digital-java-synthesizer.html", "/images/DigitalJavaSynth.jpg", 'flex-2'),
        card("Game of Life 3D", "/post/digital-java-synthesizer.html", "/images/GOL6073.jpg", 'flex-2 not-ready-card'),
        createElement(H2, "Me", {
            className: "flex-full heading-main"
        }),
        card("Curriculum Vitae", "https://cv.nikpappas.com", "/images/logo-outer128.png", 'flex-1 logo'),
        card("Linked In", "https://www.linkedin.com/in/nikos-pappas", "/images/linkedin.svg", 'flex-1 logo'),
        card("Github", "https://github.com/nikpappas", "/images/github.svg", 'flex-1 logo'),


    ].join(""), {
        className: 'cards-wrapper content'
    });
    const out = banner(createElement(DIV, [
        Header,
        Img( {
            src: "/images/GOL6073.jpg",
            alt: "Game of Life 3D",
            height: "300",
            className:'banner-img',
        })
    ], {
        className: "index-banner"
    }) + cards)
    pageRender.render("intermediate/index.html", out, head())

}

module.exports = {
    render,
    card,
    banner,
    Header,
}