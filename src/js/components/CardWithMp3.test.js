const card = require("./CardWithMp3");
const {createElement} = require('../HtmlUtils');
const {DIV} =require('../HtmlTags');

describe(__filename,()=> {
    it("renders card with mp3", () => {
        const component = card.CardWithMp3("uf", './visual', '', 'asda');
        const element = createElement(DIV,[component]);
        console.log(component);
        console.log(element);
    });
});