const {
    DIV,
    H2,
    SECTION,
    ARTICLE,
    ANCHOR,    P,
    CODE,
} = require("../HtmlTags");

const {
    postHead,
    Banner,
    GithubRepoLink,
} = require('./post');


const GT_HTML = '&#62';
const LT_HTML = '&#60';
const TAB_HTML = '&emsp;';

const FORMULA_BLOCK_CLASS = 'formula-block'
const {
    createElement,
    Component
} = require("../HtmlUtils");
const {
    typeset
} = require("../math");
const pageRender = require("../pageRender");

async function getContent() {
    const imgSrc = '/images/gravity-simulator.jpg';
    const title = 'Gravity Simulator';
    return createElement(DIV, [
        Banner(imgSrc, title),
        Component(SECTION, [
            GithubRepoLink('https://github.com/nikpappas/gravity-simulator'),
            Component(H2, "Context"),
            Component(ARTICLE, [
                Component(P, `Which student in computer science hasn't been tempted to create their own physics engine? 
            In this case I think I've postponed it enough and decided to actually go for it.`),
                Component(P,
                    `Numerous examples of particle engines can be found all over the place. 
                    Sincerely I'm not claiming that this is the best possible implementation (or even one that is good to follow). 
                    The driver for this post is rather the part I found most difficult of them all, and that's how to transpose simple Trigonometry within the world of a Java program.
                    I've found myself struggling with this problem in the past and I didn't find anyting useful online. One could argue it's to simple a problem to post anything about it.`
                ),
                Component(P,
                    `Let's take a step back and see the Physics behind this simulator. 
                    Gravity is the force between two objects and it's decsribed by Issac Newton's <em>Law of Universal Gravitational</em>. 
                    Newton had this idea of the attraction between two object but in order for this idea to be captured in a formula there was still somethign missing. 
                    It wasn't until later on that Henry Cavendish made the formula possible by experimentally verifying the gravitational constant ${await typeset('G')}.
                    ${await typeset("F = G\\frac{Mm}{r^2}", FORMULA_BLOCK_CLASS)}
                    <span class="formula-explanation">
                    where
                    ${await typeset('G')}: the Gravitational constant  ${await typeset('(6.67408 * 10 ^-8 \\frac{Nm^2}{kg^2})')},
                    <br>
                    ${await typeset('M')}: the mass of the more massive object ${await typeset('(kg)')},
                    <br>
                    ${await typeset('m')}: the mass of the less massive object ${await typeset('(kg)')},
                    <br>
                    ${await typeset('r')}:the distance between the two masses ${await typeset('(m)')}
                    </span>
                    `
                ),
                Component(P,
                    `The nice thing about forces is that they don't interact with each other, 
                    so we can simply calculate all the forces between objects and then add 
                    them together to find the resulting force of each ojbect at each given time.
                    After we have calculated the force that is acting on an object we can easily calculate the acceleration at each given moment, 
                    again thanks to our old friend Newton and his second law of motion. 
                    Which gives us a quantitative relationship between the object's mass, acceleration and the net force acting on it.
                    <br>
                    <br>
                    ${await typeset("\\vec{F} = m\\vec{a}", FORMULA_BLOCK_CLASS)}
                    `
                ),
                Component(P,
                    `Here's where I found my first objstacle in the world of Java there is no class that would allow me to add vectors.
                    When I'm talking about vectors, I realise it's a bit of an overloaded term in programming languages (see C++), but in their purely mathematical definition of it.
                    A vector has a magnitude and and a direction. Now all good so far I've got my acceleration ready but how do I tarnslate that into velocity?
                    We have a formula for it.
                    <br>
                    <br>
                    ${await typeset("a = \\frac{du}{dt}", FORMULA_BLOCK_CLASS)}
                    <br>
                    Looking at the formula and then the ceiling and the other way around... 
                    <br>
                    So in order to overcome this obstacle of adding vectors in java I decided to use my knowledge from high school and 
                    replace the net acceleration with it's constituents in a previously decided 2d plane. 
                    So I'd have the acceleration in the axis I called x and the one perpendicluar to it in axis y.
                    So the formulas become
                    ${await typeset("a_x = acos(\\theta)")},${await typeset("a_y = asin(\\theta)")}, 
                    where ${await typeset("\\theta")} is the angle that the vector forms with the x axis and ${await typeset("a")} the magnitude of the acceleration (note it doens't have the vector symbol above it).
                    and in order to calculate the constituent velocities we can use 
                    ${await typeset("v_x = a_{x}t")},${await typeset("v_y = a_{y}t")}, where t the time in seconds. In my case I have assumed one second intervals to make my life easier.
                    `
                ),
                Component(P,
                    `
                    The feeling of success didn't last long because one of my own requirements was that 
                    I could also draw all vectors, should ever I want to. The second obstacle was how to go back to the net vector by combining the constituents.
                    In order to find the magnitude (easy part) you can refer back to a few thousand years to our other old friend Pythagoras and his right triangle theorem, 
                    which we can use since by definition our two constituents are always parallel.
                    ${await typeset("\\alpha^2 = \\beta^2 + \\gamma^2", FORMULA_BLOCK_CLASS)}

                    But what about the resulting angle? I initially thought it wasn't going to be an issue but then i realised that 
                    I had little idea of how atan works in java only giving results in the range ${await typeset("(-\\frac{\\pi}{2}, \\frac{\\pi}{2})")}.
                    Thanks to my ignorance I went through tons of clauses and cases in order to end up with the simplest one.
                    Then I realised the simplest rule 
                    `
                ),
                Component(CODE,
                    `
                    public double calculateAngle(double x, double y) {<br>
                        ${TAB_HTML}if( x ${GT_HTML} 0 ) {<br>
                            ${TAB_HTML+TAB_HTML}return - atan( y/x );<br>
                        ${TAB_HTML}}<br>
                        ${TAB_HTML}return atan( y/x );<br>
                    }<br>
                    `
                ),
                Component(P,
                    `
                    I was mindblown by the simlicity of the solution compared to the head-squeezing moments I'd passed through that evening.
                    `
                ),


            ]),
            // Component(H2, "How?"),
            // Component(ARTICLE, "Tassacassasd doias odihaso dihaos idhaos idhaos idhaos ihdao sihdo iashdo isahdo ashdo  asdi aho "),
            Component(H2, "Processing visualisation"),
            Component(ARTICLE, `As this is getting rather big I'd rather not get into deatails as in to how to run Processing scetches as Standalone java apps I have made <a href="/post/processing-sketches-in-an-ide.html">another post</a> and <a targer="blank" href="https://github.com/nikpappas/processing-gradle-bootstrap">a bootstrap github project</a> just for that. But I couldn't not put the code here.`),
            Component(CODE, `
            
            //...
            final GravitySimulator sim = new GravitySimulator();
            final List<Trio<Float>> colours = new ArrayList<>();
        
            @Override
            public void settings() {
                ${TAB_HTML}size(900, 600);
            }
        
            @Override
            public void setup() {
                ${TAB_HTML}super.setup();
                ${TAB_HTML}background(20, 30, 30);
        
                ${TAB_HTML}addParticle(new Particle(100000, -100, 10));
                ${TAB_HTML}//... Adding more particles.
        
            }
        
            @Override
            public void draw() {
                ${TAB_HTML}background(20, 30, 30);
        
                ${TAB_HTML}ellipseMode(CENTER);
                
                ${TAB_HTML}List<Particle> particles = sim.getParticles();
                ${TAB_HTML}stroke(200);
                ${TAB_HTML}for (int i = 0; i < particles.size(); i++) {
                    ${TAB_HTML}${TAB_HTML}Trio<Float> colour = colours.get(i);
                    ${TAB_HTML}${TAB_HTML}fill(colour._1, colour._2, colour._3);
                    ${TAB_HTML}${TAB_HTML}Particle p = particles.get(i);
                    ${TAB_HTML}${TAB_HTML}float x = width * .5f + (float) p.x;
                    ${TAB_HTML}${TAB_HTML}float y = height * .5f + (float) p.y;

                    ${TAB_HTML}${TAB_HTML}circle(x, y, max((float) p.mass * 0.000001f, 2.0f));
                ${TAB_HTML}}

                ${TAB_HTML}delay(40);        
            }
        
            `.replace(/</g, LT_HTML)
                .replace(/>/g, GT_HTML)
                .replace(/\n/g, '<br/>')),
        ], {
            className: 'post content'
        })
    ]);

}



async function render() {
    const content = await getContent();
    const head = postHead(`
        <title>Gravity Simulator</title>
        <meta name="keywords" content="gravity,particle,processing,physics,programming" />
        `)
    await pageRender.render("./intermediate/post/gravity-simulator.html", content, head);
}

module.exports = {
    render: render
}