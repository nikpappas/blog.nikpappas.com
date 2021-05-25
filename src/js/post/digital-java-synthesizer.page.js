const {
    SECTION,
    DIV,
    ARTICLE,
    H2,
    P,
    FIGCAPTION,
    FIGURE,
    IMG
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
        Banner('/images/DigitalJavaSynth.jpg', 'Digital Java Synthesizer'),
        Component(SECTION, [
            GithubRepoLink('https://github.com/nikpappas/simple-java-synthesizer'),
            Component(H2, "Context"),
            Component(ARTICLE, [
                Component(P, `
                    I love synthesizers, I love Java. This was part of an effort to understand waves and sound composition, as well as the Java MIDI library.
                `),
                Component(P, `
                    This is a simple synthesizer project that, let's be honest is no polished but can give you a few hours of fun.
    
                    It produces waves (sine, square, tri, saw, saturated sine) and gives you the ability to mix however many of them your processor (or monitor real-estate) can handle.
                    It also gives you the ability to detune each one of them.
                `),
                Component(FIGURE, [
                    Component(IMG, '', {
                        src: '/images/waveComposition.png',
                        alt: 'Wave composition',
                        className: "post-image",
                    }),
                    Component(FIGCAPTION, 'Composition of the main sine wave and two consequtive harmonics (again sine)')
                ]),
            ]),
            Corrections,
        ], {
            className: 'post content'
        })
    ]);
}

async function render() {
    console.log("DIGITAL SYNTH");
    const content = getContent();
    await pageRender.render("./intermediate/post/digital-java-synthesizer", content, postHead({
        title: 'Digital Java Synthesizer',
        description: 'The simplest java wave composition software that also works with your midi controller.',
        imageUrl: 'https://blog.nikpappas.com/images/social/wave-composition.jpg'
    }, `

        <meta name="keywords" content="analog, synth, sunthesizer, transistors, capacitors, reverse avalanche" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />        
        <meta property="og:url" content="https://blog.nikpappas.com/post/digital-java-synthesizer" />        
        <meta name="keywords" content="midi, synthesizer, composition, wave, sine, tri, saw,processing,programming,java" />
    `));
}


module.exports = {
    render: render
}