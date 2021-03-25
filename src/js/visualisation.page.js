const pageRender = require("./pageRender");

function render(){
    pageRender.render("./intermediate/visualisation.html", "","");
}

module.exports = {
    render: render
}