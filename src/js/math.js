var mjAPI = require("mathjax-node");
mjAPI.config({
    MathJax: {
        // traditional MathJax configuration
    }
});
mjAPI.start();

async function typeset(math, className) {
    const res = await mjAPI.typeset({
        math,
        format: "TeX", // or "inline-TeX", "MathML"
        svg: true, // or svg:true, or html:true
    });
    // console.log(res.svg);
    if(className){
        return res.svg.replace('<svg', `<svg class="${className}"`);
    }
    return res.svg;

}


module.exports = {
    typeset
}