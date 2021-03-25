const pageRender = require("./pageRender");

function render(){
    pageRender.render("./intermediate/electronics.html", "",""); 
}

module.exports = { 
    render: render
}

