const {
    DIV,
    H3,
    IMG,
    PICTURE,
    AUDIO,
    SOURCE
} = require('../HtmlTags');

const {
    Component
} = require('../HtmlUtils');


function CardWithMp3(title, backgroundUrl, flexClass, audioSource) {
    return Component(DIV,
        [Component(PICTURE, [
            Component(IMG, '', {
                src: backgroundUrl,
                alt: title,
                className: 'card-img',
                height: '200',
                width: '250',
                loading: 'lazy'
            }),
            Component(AUDIO, [Component(SOURCE, '', {
                src: audioSource,
                type: 'audio/mpeg'
            })], {
                className: "audio",
                controls: true,
                preload:'none'
            }),
        ]),
            Component(DIV, [Component(H3, title)], {
                className: "card-title"
            }),
        ], {
        className: `card ${flexClass}`,
    });
}

module.exports = {
    CardWithMp3: CardWithMp3,
}