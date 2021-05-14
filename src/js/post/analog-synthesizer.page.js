const {
    CardWithMp3
} = require('../components/CardWithMp3');
const {
    SECTION,
    DIV,
    ARTICLE,
    H2,
    P,
    IMG,
    PICTURE,
    FIGURE,
    FIGCAPTION,
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
        Banner('/images/visualisation.jpg', 'Analog Synthesizer'),
        Component(SECTION, [
            // GithubRepoLink('https://github.com/nikpappas/processing-gradle-bootstrap'),
            Component(H2, "Context"),
            Component(ARTICLE, [
                Component(P, `
                    For the last decade I have been a very single-sidedly digital person. 
                    Everything I did involved in some form the computer, music, design, photos they all harvested the power of software. 
                    Ever since I did a computer architecture course in uni I was facinated by the building blocks of a computer.
                `),
                Component(P, `
                    I thought it would be a nice endevour to create a simple synthesizer that is fully analog and after a bit of research online I've found this amazing website of a like-minded person.
                    <a href="https://lookmumnocomputer.com/" target="blank">LookMumNoComputer</a> and his <a href="https://www.lookmumnocomputer.com/projects#/simplest-oscillator" target="blank">Super Simple Oscilator</a> 
                    Introduced me to the marvels of hacking transitors by using them in the "reverse avalanche mode". 
                    (More on reverse avalanche mode <a href="http://www.kerrywong.com/2014/03/19/bjt-in-reverse-avalanche-mode/" target="blank">here</a>)

                `),
                Component(FIGURE, [
                    Component(IMG, '', {
                        src: '/images/SuperSimpleOscilator_bb.svg',
                        alt: 'Super Simple Oscilator breadboard',
                        className: "post-image",
                    }),
                    Component(FIGCAPTION, 'Breadboard')
                ]),
                Component(FIGURE, [
                    Component(IMG, '', {
                        src: '/images/SuperSimpleOscilator_schem.svg',
                        alt: 'Super Simple Oscilator schematic',
                        className: "post-image",
                    }),
                    Component(FIGCAPTION, 'Schematic')
                ]),
                Component(P, `
                OK so finally after overcoming all those hurdles and misconceptions I had I made it work and I decided to make a synthesizer that has 4 oscilators. Right, but what's the combination of base resistance and capacitance I'm looking for? 🤦🏽 
                With all my academic spirit I decided to make a study and hopefully help others to decide quicker without having to test a million settings.
                `)
            ]),
            Component(H2, "Study"),
            Component(ARTICLE, [
                Component(P, `
                    So here I present a series of combinations of resistors and pacacitors and how they sound, before any potentiometer applied more resistance.
                `),
                Component(FIGURE, [
                    CardWithMp3('1KΩ - 4.7μF', '/images/1K-4.7uF.png', 'flex-2 withmp3', '/audio/1K-4.7uF.mp3'),
                    CardWithMp3('1KΩ - 10μF', '/images/1K-10uF.png', 'flex-2 withmp3', '/audio/1K-10uF.mp3'),
                    CardWithMp3('1KΩ - 22μF', '/images/1K-22uF.png', 'flex-2 withmp3', '/audio/1K-22uF.mp3'),
                    CardWithMp3('5KΩ - 0.047μF', '/images/1K-33uF.png', 'flex-2 withmp3', '/audio/5K-0.047uF.mp3'),
                    CardWithMp3('5KΩ - 1μF', '/images/5K-1uF.png', 'flex-2 withmp3', '/audio/5K-1uF.mp3'),
                    CardWithMp3('5KΩ - 4.7μF', '/images/5K-4.7uF.png', 'flex-2 withmp3', '/audio/5K-4.7uF.mp3'),
                    CardWithMp3('5KΩ - 10μF', '/5K-10uF.png', 'flex-2 withmp3', '/audio/5K-10uF.mp3'),
                    CardWithMp3('5KΩ - 22μF', '/images/5K-22uF.png', 'flex-3 withmp3', '/audio/5K-22uF.mp3'),
                    CardWithMp3('5KΩ - 33μF', '/images/5K-33uF.png', 'flex-2 withmp3', '/audio/5K-33uF.mp3'),
                    CardWithMp3('5KΩ - 47μF', '/images/5K-47uF.png', 'flex-2 withmp3', '/audio/5K-47uF.mp3'),
                    CardWithMp3('10KΩ - 0.047μF', '/images/10K-0.047uF.png', 'flex-2 withmp3', '/audio/10K-0.047uF.mp3'),
                    CardWithMp3('10KΩ - 1μF', '/images/10K-1uF.png', 'flex-2 withmp3', '/audio/10K-1uF.mp3'),
                    CardWithMp3('10KΩ - 4.7μF', '/images/10K-4.7uF.png', 'flex-1 withmp3', '/audio/10K-4.7uF.mp3'),
                    CardWithMp3('10KΩ - 10μF', '/images/10K-10uF.png', 'flex-3 withmp3', '/audio/10K-10uF.mp3'),
                    CardWithMp3('10KΩ - 22μF', '/images/10K-22uF.png', 'flex-2 withmp3', '/audio/10K-22uF.mp3'),
                    CardWithMp3('10KΩ - 33μF', '/images/10K-33uF.png', 'flex-2 withmp3', '/audio/10K-33uF.mp3'),
                    CardWithMp3('10KΩ - 47μF', '/images/10K-47uF.png', 'flex-2 withmp3', '/audio/10K-47uF.mp3'),
                    CardWithMp3('20KΩ - 0.047μF', '/images/20K-0.047uF.png', 'flex-2 withmp3', '/audio/20K-0.047uF.mp3'),
                    CardWithMp3('20KΩ - 1μF', '/images/20K-1uF.png', 'flex-2 withmp3', '/audio/20K-1uF.mp3'),
                    CardWithMp3('20KΩ - 4.7μF', '/images/20K-4.7uF.png', 'flex-2 withmp3', '/audio/20K-4.7uF.mp3'),
                    CardWithMp3('20KΩ - 10μF', '/images/20K-10uF.png', 'flex-2 withmp3', '/audio/20K-10uF.mp3'),
                    CardWithMp3('20KΩ - 22μF', '/images/20K-22uF.png', 'flex-2 withmp3', '/audio/20K-22uF.mp3'),
                    Component(FIGCAPTION, 'A sample of sounds generated by different combinations of resistors and capacitors'),
                ], {
                    className: 'cards-wrapper'
                })
            ]),

            Component(H2, "Results"),
            Component(ARTICLE, [
                Component(P, `

            Here they are : ]
                `),
            ]),
            Corrections,

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