const Math = require('./math');

describe(__filename, () => {
    it('renderds math from tex', async () => {
        const res = await Math.typeset('E = mc^2');
        expect(res).toMatchSnapshot();
    });
});