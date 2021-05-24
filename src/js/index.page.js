const {
    DIV,
    H3,
    H2,
    H1,
    PICTURE,
    SECTION,
    HEADER,
    OL,
    LI,
} = require('./HtmlTags');
const {
    createElement,
    Component,
    A,
    Div,
    Img
} = require('./HtmlUtils');
const pageRender = require('./pageRender');

function head(title, description, imageUrl) {
    return `
    <title>${title}</title>
    <meta content="${title}" property="og:title" />
    <meta content="${title}" property="twitter:title" />

    <meta property="og:type" content="website" />
    <meta name="keywords" content="blog,processing,Nikolaos, Pappas, visualisation, visualization, music, project, programming" />
    <meta name="description" content="${description}">
    <meta property="og:description" content="${description}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="twitter:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1050" />
    <meta property="og:image:height" content="1050" />
    <meta content="summary_large_image" name="twitter:card" />

    `;
}

function Tabs(active) {

    const tabs = [{
            title: 'All',
            href: '/'
        },
        {
            title: 'Music',
            href: '/music.html'
        },
        {
            title: 'Electronics',
            href: '/electronics.html'
        },
        {
            title: 'Processing',
            href: '/processing.html'
        },
        {
            title: 'Visualisation',
            href: '/visualisation.html'
        },

    ]
    return Component(OL, tabs.map(({
        title,
        href
    }, i) => {
        if (i === active) {
            return Component(LI, [A(title, {
                href,
                className: 'active'
            })])
        }
        return Component(LI, [A(title, {
            href
        })])

    }), {
        className: 'content tabs'
    })

}

const Header = Component(HEADER, [
    Div([
        Div([
            Img({
                src: '/images/logo-outer128.png',
                alt: `Nikolaos Pappas' logo`,
                style: 'vertical-align:bottom',
                height: "94",
            }),
            Component(H1, 'Nikolaos Pappas', {
                className: 'index-logo-title'
            }),

        ], {
            className: 'header-left'
        }),
    ])
]);

const banner = (body) =>
    createElement(SECTION, body)


function Card(title, url, backgroundUrl, flexClass) {
    return Component(DIV,
        [A(
            [Component(PICTURE, [Img({
                    src: backgroundUrl,
                    alt: title,
                    className: 'card-img',
                    height: '200',
                    width: '250',
                    loading: 'lazy'
                })]),
                Div([Component(H3, title)], {
                    className: "card-title"
                })
            ], {
                href: url
            })], {
            className: `card ${flexClass}`,
        });
}

const cards = [
    Card("Gravity Simulator", "/post/gravity-simulator.html", "/images/gravity-simulator.jpg", 'flex-1 processing visualisation'),
    Card("Processing sketches in an IDE", "/post/processing-sketches-in-an-ide.html", "/images/processing-intellij.jpg", 'flex-3 processing'),
    Card("Analog Synthesizer", "/post/analog-synthesizer.html", "/images/visualisation-thumb.jpg", 'flex-2 music electronics'),
    Card("Java Synthesizer", "/post/digital-java-synthesizer.html", "/images/DigitalJavaSynth.jpg", 'flex-2 music processing'),
    Card("Game of Life 3D", "/post/game-of-life-3d.html", "/images/GOL6073.jpg", 'flex-2 not-ready-card processing visualisation'),
    Component(H2, "Me", {
        className: "flex-full heading-main all"
    }),
    Card("Curriculum Vitae", "https://cv.nikpappas.com", "/images/logo-outer128.png", 'flex-1 logo all'),
    Card("Linked In", "https://www.linkedin.com/in/nikos-pappas", "/images/linkedin.svg", 'flex-1 logo all'),
    Card("Github", "https://github.com/nikpappas", "/images/github.svg", 'flex-1 logo all'),
];


function Body(cards, active) {
    return createElement(DIV, [
        Tabs(active),
        Component(DIV, [
            // createElement(H2, "Categories", {
            //     className: "flex-full heading-main"
            // }),
            ...cards,
        ], {
            className: 'cards-wrapper content'

        })
    ]);

}


function header() {
    return banner(createElement(DIV, [
        Header,
        Img({
            src: "/images/GOL6073.jpg",
            alt: "Game of Life 3D",
            height: "300",
            className: 'banner-img',
        })
    ], {
        className: "index-banner"
    }));
}

function render() {
    const body = Body(cards, 0);
    const out = header() + body
    pageRender.render("intermediate/index.html", out, head(
        "Nikolaos Pappas' Blog",
        "A blog with a variety of topics from electronics to visualisation. It's a gallery of personal projects aiming to inspire.",
        "https://blog.nikpappas.com/images/social/game-of-life.jpg"
    ))

}

module.exports = {
    render,
    Card,
    cards,
    banner,
    Body,
    Header,
    header,
    head,
    Tabs,
}