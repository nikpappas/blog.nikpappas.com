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
    GithubRepoLink
} = require('./post');



function getContent() {
    return createElement(DIV, [
        Banner('/images/visualisation.jpg', 'Analog Synthesizer'),
        Component(SECTION, [
            // GithubRepoLink('https://github.com/nikpappas/processing-gradle-bootstrap'),
            Component(H2, "Context"),
            Component(ARTICLE, [
                Component(P, `
                    For the last decade I have been a very single sidedly digital person. 
                    Everything I did involved in some form the computer, music, design, photos they all harvested the power of software. 
                    Ever since I did a computer architecture course in uni I was facinated by the building blocks of a computer.
                `),
                Component(P, `
                    I thought it would be a nice endevour to create a simple synthesizer that is fully analog and after a bit of research online I've found this amazing website of a like-minded person.
                    <a href="https://lookmumnocomputer.com/" target="blank">LookMumNoComputer</a> and his <a href="https://www.lookmumnocomputer.com/projects#/simplest-oscillator" target="blank">Super Simple Oscilator</a> 
                    Introduced me to the marvels of hacking transitors by using them in the "reverse avalanche mode". 
                    (More on reverse avalanche mode <a href="http://www.kerrywong.com/2014/03/19/bjt-in-reverse-avalanche-mode/" target="blank">here</a>)

                `),
                Component(P, `
                Now imagine you can harvest botht the powers given to you by the Processing library and an awesome IDE (in this case I've chosen IntelliJ community eddition) using the processing library in a 
                <a href="https://github.com/nikpappas/processing-gradle-bootstrap" target="blank">gradle project</a>.
                `)
            ]),
            Component(H2, "Study"),
            Component(ARTICLE, [
                Component(P, `
                    For the last decade I have been a very single sidedly digital person. 
                    Everything I did involved in some form the computer, music, design, photos they all harvested the power of software. 
                    Ever since I did a computer architecture course in uni I was facinated by the building blocks of a computer.
                `),
            ]),

            Component(H2, "Results"),
            Component(ARTICLE, [
                Component(P, `
                    For the last decade I have been a very single sidedly digital person. 
                    Everything I did involved in some form the computer, music, design, photos they all harvested the power of software. 
                    Ever since I did a computer architecture course in uni I was facinated by the building blocks of a computer.
                `),
            ]),

        ], {
            className: 'post content'
        })
    ]);
}

async function render() {
    const content = getContent();
    await pageRender.render("./intermediate/post/analog-synthesizer.html", content, postHead(`
    <title>Analog Synthesizer</title>

    <meta property="og:image" content="https://blog.nikpappas.com/images/DigitalJavaSynth.jpg" />
    <meta property="og:description" content="A java (gradle) bootstrap projetc to allow developers to harness the power of both the processin library and the that of an IDE." />
    <meta property="og:url" content="https://blog.nikpappas.com/post/analog-synthesizer.html" />        

    <meta name="keywords" content="analog, synth, sunthesizer" />
    `));
}


module.exports = {
    render: render
}