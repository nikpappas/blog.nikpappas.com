function createElement(tag, body, attributes) {
    const bodyStr = body && Array.isArray(body) ? body.map(x => createElement(x.tag, x.body, x.attributes)).join('') : body;
    console.log('bodyStr', bodyStr) 
    const attrStr = attributes ? Object.keys(attributes).map(k => `${map2Html(k)}="${attributes[k]}"`).join(" ") : '';
    console.log('attr', attrStr);
    return `<${tag} ${attrStr}>${bodyStr}</${tag}>`;
}


module.exports = {
    createElement,
    Component: (tag, body, attributes) => new Component(tag, body, attributes),
}

function map2Html(k) {
    return k === 'className' ? 'class' : k;
}

function Component(tag, body, attributes) {
    this.tag = tag;
    this.body = body;
    this.attributes = attributes;
}