const Math = require('./math');

describe(__filename, () => {
    it('renderds math from tex', () => {
        const res = Math.typeset('E = mc^2');
        console.log(res);
    });
});