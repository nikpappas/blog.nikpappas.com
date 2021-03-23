const pageRender = require("./pageRender");

function render(){
    pageRender.render("./intermediate/music.html", "","");
}

module.exports = {
    render: render
}