export type Block =
  | { kind: "p"; html: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "code"; lang: string; source: string }
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "link"; href: string; label: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  categories: Category[];
  status?: "wip" | "published";
  repo?: string;
  body: Block[];
}

export type Category = "Music" | "Electronics" | "Processing" | "Visualisation" | "Simulation";

export const categories: Category[] = ["Music", "Electronics", "Processing", "Visualisation", "Simulation"];

// Images are hot-linked from the original blog domain — swap the prefix once they're vendored locally.
const IMG = "https://blog.nikpappas.com/images";

export const posts: Post[] = [
  {
    slug: "quad-tree-3d",
    title: "Quad-tree, in 3D",
    excerpt:
      "A Processing sketch that pairs a 2D quad-tree with a 3D render of its own tree topology — click to drop points, watch the partition redraw on one side and the tree of spheres rebuild on the other.",
    cover: "https://github.com/nikpappas/VisualAlgo/raw/main/src/main/java/com/nikpappas/algo/space/quadtree/quad-tree.png",
    categories: ["Processing", "Visualisation"],
    status: "wip",
    repo: "https://github.com/nikpappas/VisualAlgo/tree/main/src/main/java/com/nikpappas/algo/space/quadtree",
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "A quad-tree partitions a 2D plane by recursively splitting any over-crowded cell into four children. The structure itself — parent linked to four offspring — is a thing you almost never get to look at; you just feel it in the query speed. This sketch makes the structure literal: a <strong>2D quad-tree</strong> on the right, and the <em>same tree</em> reified as a <strong>3D spatial diagram</strong> on the left.",
      },
      { kind: "h2", text: "How it works" },
      { kind: "h3", text: "Two panels, one tree" },
      {
        kind: "p",
        html: "The Processing window is two stacked <code>PGraphics</code> buffers — a <code>P3D</code> panel on the left and a <code>P2D</code> panel on the right, both reading from a single <code>QuadTree2D</code>. Click anywhere on the 2D panel and the point is appended to the root; the partition splits as needed and the 3D mirror redraws on the next frame.",
      },
      { kind: "h3", text: "The 3D tree of spheres" },
      {
        kind: "p",
        html: "Each node becomes a sphere; each level of recursion drops by a fixed height (<code>LEVEL_H = 90</code>). The four children fan out diagonally by half-spread on the X/Z axes, so the geometry mirrors the spatial quadrants — top-right, top-left, bottom-left, bottom-right. <em>Leaves</em> are tinted red, <em>branches</em> blue, and sphere radius shrinks with the spread so deeper nodes look further away even before perspective kicks in.",
      },
      {
        kind: "code",
        lang: "java",
        source: `private void draw3DNode(QuadTree2D.QuadNode node,
                        float cx, float cy, float cz,
                        float spread) {
  float childY = cy + LEVEL_H;
  float h = spread / 2;

  area3d.stroke(80);
  if (node.n11 != null) area3d.line(cx, cy, cz, cx + h, childY, cz + h);
  if (node.n12 != null) area3d.line(cx, cy, cz, cx + h, childY, cz - h);
  if (node.n21 != null) area3d.line(cx, cy, cz, cx - h, childY, cz - h);
  if (node.n22 != null) area3d.line(cx, cy, cz, cx - h, childY, cz + h);

  area3d.pushMatrix();
  area3d.translate(cx, cy, cz);
  boolean isLeaf =
      node.n11 == null && node.n12 == null
      && node.n21 == null && node.n22 == null;
  area3d.fill(isLeaf ? color(200, 80, 80) : color(80, 140, 200));
  area3d.sphere(max(4, spread / 10));
  area3d.popMatrix();

  if (node.n11 != null) draw3DNode(node.n11, cx + h, childY, cz + h, h);
  if (node.n12 != null) draw3DNode(node.n12, cx + h, childY, cz - h, h);
  if (node.n21 != null) draw3DNode(node.n21, cx - h, childY, cz - h, h);
  if (node.n22 != null) draw3DNode(node.n22, cx - h, childY, cz + h, h);
}`,
      },
      { kind: "h3", text: "The 2D partition" },
      {
        kind: "p",
        html: "On the right panel each <code>QuadNode</code> draws its own bounding rectangle, then recurses into its children. The leaves end up as the smallest rectangles visible; the deposited points sit on top as red circles. Because both panels traverse the same tree, the moment a cell splits on the right, a new branch appears on the left.",
      },
      { kind: "h3", text: "An orbiting camera" },
      {
        kind: "p",
        html: "The 3D camera doesn't free-fly — it swings on a fixed pendulum between <code>0</code> and <code>π/2</code> radians, easing the view back and forth across the front face of the tree. Enough motion to give parallax, not so much that you lose orientation.",
      },
      { kind: "h2", text: "Status" },
      { kind: "p", html: "<em>Under construction</em> — write-up to add: notes on the underlying <code>QuadTree2D</code> implementation, the corner cases at the boundary, and a clip of the structure rebuilding under live point insertion." },
    ],
  },
  {
    slug: "binary-search",
    title: "Binary search",
    excerpt:
      "A Processing sketch that walks binary search across a sorted strip — start, end, current, and the tick-tock between aiming at the midpoint and comparing what you find.",
    cover:
      "https://github.com/nikpappas/VisualAlgo/raw/main/src/main/java/com/nikpappas/algo/searching/binarysearch/binary-search.png",
    categories: ["Processing", "Visualisation"],
    repo: "https://github.com/nikpappas/VisualAlgo/tree/main/src/main/java/com/nikpappas/algo/searching/binarysearch",
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "Binary search halves a sorted range every step until the target is cornered. It's the textbook example of an algorithm whose efficiency is hard to <em>feel</em> from a complexity class. This Processing sketch makes the halving literal — a sorted strip of sixteen integers, three coloured pointers, and a tick-tock between picking a midpoint and comparing it to the target.",
      },
      { kind: "h2", text: "How it works" },
      { kind: "h3", text: "The step machine" },
      {
        kind: "p",
        html: "Each tick of the sketch toggles a single boolean — <code>moveCur</code>. One frame the cursor jumps to the midpoint of the active window; the next frame the value there is compared to the target and the window is shrunk on whichever side overshoots. Splitting the loop into two visible phases is the trick: the eye gets to land on the midpoint <em>before</em> the boundary lurches inward.",
      },
      {
        kind: "code",
        lang: "java",
        source: `private void step() {
  if (moveCur) {
    current = start + (end - start) / 2;
  } else {
    int cur = list.get(current);
    if (cur == target) {
      return;
    }
    if (cur < target) {
      start = current + 1;
    } else {
      end = current - 1;
    }
    steps++;
  }
  moveCur = !moveCur;
}`,
      },
      { kind: "h3", text: "Reading the colour code" },
      {
        kind: "p",
        html: "Each pointer is its own ink. <strong>Blue</strong> sits on <em>start</em>, <strong>orange</strong> on <em>end</em>, and an <strong>amber</strong> fill marks the current midpoint under inspection. The target value is shown above the strip in <strong>purple</strong> until the moment it's reached — at which point the matching cell flips to <strong>green</strong>. Anything outside the active window goes pale grey so the working set is always obvious.",
      },
      { kind: "h3", text: "Driving it" },
      {
        kind: "p",
        html: "The sketch auto-steps once a second from a scheduled executor, so you can drop in and watch it run unattended. Press any key to override the timer and walk through one tick at a time — useful for staring at a particular comparison.",
      },
      {
        kind: "image",
        src: "https://github.com/nikpappas/VisualAlgo/raw/main/src/main/java/com/nikpappas/algo/searching/binarysearch/binary-search.png",
        alt: "Binary search visualiser in mid-run, with start, current and end pointers across a sorted strip",
        caption: "A snapshot mid-search — start (blue), current (amber), end (orange), and the target value sitting above the strip.",
      },
    ],
  },
  {
    slug: "telecom-satellite-simulation",
    title: "Telecom satellite simulation",
    excerpt:
      "A real-time simulation of a telecom satellite constellation built in Unreal Engine — orbital mechanics, beam coverage, and the choreography between ground stations and birds.",
    cover: "https://metasatcom.com/videos/orbits-night.mp4",
    categories: ["Simulation", "Visualisation"],
    status: "wip",
    // TODO: add repo URL when published
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "Built in <strong>Unreal Engine</strong> as a real-time visualisation of a telecom satellite constellation. The goal: turn the abstract dance of orbits, ground stations, and signal hand-offs into something you can <em>watch happen</em>.",
      },
      { kind: "h2", text: "What it simulates" },
      { kind: "h3", text: "Orbital mechanics" },
      {
        kind: "p",
        html: "Satellites follow Keplerian orbits derived from real-world TLE-style parameters, propagated each frame.",
      },
      { kind: "h3", text: "Coverage & link budget" },
      {
        kind: "p",
        html: "Each satellite projects its footprint onto the Earth; ground stations connect to whichever bird is currently overhead, with the link state visualised as it makes and breaks.",
      },
      { kind: "h2", text: "Handcrafted algorithms" },
      {
        kind: "p",
        html: "Two pieces of telecom logic are bespoke to this simulation rather than pulled from a library — they're where the engineering work actually lives.",
      },
      { kind: "h3", text: "Handover" },
      {
        kind: "p",
        html: "As satellites drift out of a ground station's cone, traffic has to be passed to the next bird overhead without dropping the link. The handover algorithm weighs each candidate by elevation, remaining dwell time and current load, then picks the transition window that minimises disruption. The animation makes the timing of these switches tangible — you see the link colour change frame-by-frame as the decision is made.",
      },
      { kind: "h3", text: "Total potential capacity" },
      {
        kind: "p",
        html: "A second algorithm computes the constellation's <strong>total potential capacity</strong> — the upper bound of throughput you could squeeze out of the configuration if every satellite was paired with the best-possible ground station at every instant. It folds together footprint overlap, link-budget bands and an LP-style assignment over the contact graph, and it surfaces the number that actually matters for sizing a network.",
      },
      { kind: "h2", text: "Built on" },
      {
        kind: "p",
        html: 'Orbit propagation runs on <a href="https://github.com/dnwrnr/sgp4">dnwrnr/sgp4</a> — a C++ implementation of the SGP4/SDP4 models that turn two-line element sets into per-frame satellite positions.',
      },
      { kind: "h2", text: "Status" },
      { kind: "p", html: "<em>Under construction</em> — write-up, screenshots and a flythrough clip to come." },
    ],
  },
  {
    slug: "mandelbrot-renderer",
    title: "Mandelbrot renderer",
    excerpt:
      "A keyboard-driven Mandelbrot explorer in Java + Processing 4 — pan complex space with the arrow keys, zoom with =/−, and pour your CPU at whatever pocket of the set catches your eye.",
    cover: "https://github.com/nikpappas/mandelbrot-renderer/raw/main/snaps/sample.jpg",
    categories: ["Processing", "Visualisation"],
    repo: "https://github.com/nikpappas/mandelbrot-renderer",
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "<em>A window to the depths of Mandelbrot sets.</em> The Mandelbrot set is the collection of complex numbers <code>c</code> for which the iteration <code>z₀ = 0</code>, <code>zₙ₊₁ = zₙ² + c</code> stays bounded forever. Plot the ones that do in black, colour the ones that escape by how long they took, and you get the famous self-similar coastline. This renderer is Java + Processing 4, built with Gradle, and turns the set into something you can sit in front of and pan around.",
      },
      { kind: "h2", text: "How it works" },
      { kind: "h3", text: "The iteration" },
      {
        kind: "p",
        html: "Each on-screen pixel maps to a complex coordinate in the viewport. The renderer iterates the Mandelbrot recurrence per pixel and records the step at which the magnitude crosses 2 — beyond that, divergence is guaranteed. Pixels are coloured by escape time; pixels that never escape stay black and reveal the body of the set.",
      },
      { kind: "h3", text: "Mouse mode vs. normal mode" },
      {
        kind: "p",
        html: "<strong>Normal mode</strong> renders a fixed rectangular window in complex space — pan with the arrow keys, scale the window with <code>,</code> and <code>.</code>. <strong>Mouse mode</strong> (toggle with <code>m</code>) restricts work to a moving disc around the cursor, so a deep-zoom probe can be aimed by hand without re-rendering the whole frame.",
      },
      { kind: "h3", text: "Multithreaded by default" },
      {
        kind: "p",
        html: "The renderer fans pixel rows out across worker threads, defaulting to <code>cores − 1</code> so the UI thread stays responsive. <code>w</code> and <code>s</code> adjust the worker count live — useful for trying out where the gains stop being linear when the iteration count climbs deep into the set.",
      },
      { kind: "h2", text: "Controls" },
      {
        kind: "code",
        lang: "keymap",
        source: `arrows     pan through complex space
= / -      zoom in / zoom out
, / .      adjust render window  (mouse range in mouse mode)
0          switch between iteration equations
m          toggle mouse mode on / off
w / s      worker thread count   (defaults to cores − 1)`,
      },
      {
        kind: "image",
        src: "https://github.com/nikpappas/mandelbrot-renderer/raw/main/snaps/sample.jpg",
        alt: "Sample render from the Mandelbrot renderer — a deep zoom into a fractal boundary",
        caption: "A sample render lifted from the repo's snaps/ folder.",
      },
      { kind: "h2", text: "Build & run" },
      {
        kind: "p",
        html: "Java 11, Gradle. Clone the repo, then:",
      },
      {
        kind: "code",
        lang: "bash",
        source: `./gradlew clean test
./gradlew run`,
      },
    ],
  },
  {
    slug: "gravity-simulator",
    title: "Gravity Simulator",
    excerpt:
      "Transposing simple trigonometry into a Java physics engine — and the small joys of decomposing vectors when the language won't do it for you.",
    cover: `${IMG}/gravity-simulator.jpg`,
    categories: ["Processing", "Visualisation"],
    repo: "https://github.com/nikpappas/gravity-simulator",
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "The main challenge of building a physics engine wasn't the physics — it was <em>how to transpose simple Trigonometry within the world of a Java program</em>.",
      },
      {
        kind: "p",
        html: "Newton's Law of Universal Gravitation states <code>F = G · (M·m / r²)</code>, where <code>G</code> is the gravitational constant, <code>M</code> and <code>m</code> are masses, and <code>r</code> the distance between objects.",
      },
      {
        kind: "p",
        html: "Java doesn't ship with built-in vector support, so I replaced the net acceleration with its constituents on a chosen 2D plane — decomposing forces into x and y components with trig.",
      },
      {
        kind: "p",
        html: "Going the other way — converting components back into magnitude and angle — meant working around the limited range of Java's <code>atan()</code>. Once that clicked, the rest fell into place.",
      },
      { kind: "h2", text: "Processing Sketch" },
      {
        kind: "code",
        lang: "java",
        source: `//...
final GravitySimulator sim = new GravitySimulator();
final List<Trio<Float>> colours = new ArrayList<>();

@Override
public void settings() {
  size(900, 600);
}

@Override
public void setup() {
  super.setup();
  background(20, 30, 30);
  addParticle(new Particle(100000, -100, 10));
  //... Adding more particles.
}

@Override
public void draw() {
  background(20, 30, 30);
  ellipseMode(CENTER);
  List<Particle> particles = sim.getParticles();
  stroke(200);
  for (int i = 0; i < particles.size(); i++) {
    Trio<Float> colour = colours.get(i);
    fill(colour._1, colour._2, colour._3);
    Particle p = particles.get(i);
    float x = width * .5f + (float) p.x;
    float y = height * .5f + (float) p.y;
    circle(x, y, max((float) p.mass * 0.000001f, 2.0f));
  }
  delay(40);
}`,
      },
      {
        kind: "image",
        src: "https://blog.nikpappas.com/videos/gravity-simulator.mp4",
        alt: "Gravity simulator running — particles tracing orbits",
        caption: "The simulator in motion — particles tracing each other through their mutual gravity.",
      },
    ],
  },
  {
    slug: "processing-sketches-in-an-ide",
    title: "Processing sketches in an IDE",
    excerpt:
      "Bringing Processing's library into a real Gradle + IntelliJ project — keeping the creative loop and gaining a proper IDE.",
    cover: `${IMG}/processing-intellij-banner.jpg`,
    categories: ["Processing"],
    repo: "https://github.com/nikpappas/processing-gradle-bootstrap",
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "Processing has made Java Swing programming wonderfully accessible. The official editor is great for quick sketches, but the team has prioritised the robustness of the library over building a fully-featured IDE — and rightly so.",
      },
      {
        kind: "p",
        html: 'This post is about pairing the powers of the Processing library with an awesome IDE — in my case <strong>IntelliJ Community Edition</strong> — by depending on the Processing library from a <strong>Gradle</strong> project.',
      },
      {
        kind: "image",
        src: `${IMG}/processing-intellij-banner.jpg`,
        alt: "Processing sketches in an IDE",
        caption: "Processing × IntelliJ × Gradle.",
      },
      {
        kind: "p",
        html: 'The bootstrap project lives at <a href="https://github.com/nikpappas/processing-gradle-bootstrap">github.com/nikpappas/processing-gradle-bootstrap</a>. Clone it, open it in IntelliJ, run the sketch — and you have refactoring, search, debug breakpoints and version control on top of the Processing API.',
      },
    ],
  },
  {
    slug: "analog-synthesizer",
    title: "Analog Synthesizer",
    excerpt:
      "After a decade of digital pursuits, soldering my way through 22 RC pairings to find the sweet spot of reverse-avalanche oscillators.",
    cover: `${IMG}/visualisation.jpg`,
    categories: ["Electronics", "Music"],
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "After a decade focused on digital, a computer architecture course pulled me back to the analog side. The catalyst was <a href=\"https://www.lookmumnocomputer.com/\">LookMumNoComputer</a>'s Super Simple Oscillator — and reverse-avalanche-mode transistors.",
      },
      {
        kind: "p",
        html: "Electronic music has a long lineage of artists making their own sounds — some trace it back to 1748. I built a synth from four oscillators because the waveforms reverse-avalanche transistors generate are distinctively different from the textbook wave types.",
      },
      {
        kind: "p",
        html: "A small passive filter capacitor at the output tames some of the harshness.",
      },
      { kind: "h2", text: "Circuit Diagrams" },
      {
        kind: "image",
        src: `${IMG}/SuperSimpleOscilator_bb.svg`,
        alt: "Super Simple Oscillator — breadboard layout",
        caption: "Breadboard layout.",
      },
      {
        kind: "image",
        src: `${IMG}/SuperSimpleOscilator_schem.svg`,
        alt: "Super Simple Oscillator — schematic",
        caption: "Schematic.",
      },
      { kind: "h2", text: "Study: Resistor × Capacitor" },
      {
        kind: "p",
        html: "I worked through 22 different resistor / capacitor pairings so others don't have to brute-force it. Resistor values: <strong>1KΩ, 5KΩ, 10KΩ, 20KΩ</strong>. Capacitors from <strong>0.047µF to 47µF</strong>. Each pairing has a sound sample on the original post.",
      },
      { kind: "h3", text: "Results" },
      {
        kind: "p",
        html: "Final voicing: <strong>2× (1KΩ + 22µF)</strong> and <strong>2× (5KΩ + 10µF)</strong>.",
      },
    ],
  },
  {
    slug: "digital-java-synthesizer",
    title: "Java Synthesizer",
    excerpt:
      "I love synthesizers and I love Java — a simple, deliberately-unpolished playground for waves, harmonics and the Java MIDI library.",
    cover: `${IMG}/DigitalJavaSynth.jpg`,
    categories: ["Music"],
    repo: "https://github.com/nikpappas/simple-java-synthesizer",
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "<em>I love synthesizers, I love Java.</em> This was part of an effort to understand waves, sound composition, and the Java MIDI library.",
      },
      {
        kind: "p",
        html: "It's a simple synth project — let's be honest, it's not polished — but it gives you a few hours of fun. Sine, square, triangle, sawtooth and saturated sine waves; mix multiple at once; detune each oscillator. Limits: your CPU and your screen real-estate.",
      },
      {
        kind: "image",
        src: `${IMG}/waveComposition.png`,
        alt: "Composition of the main sine wave and two consecutive harmonics",
        caption: "Composition of the main sine wave and two consecutive harmonics (again, sine).",
      },
    ],
  },
  {
    slug: "game-of-life-3d",
    title: "Game of Life, 3D",
    excerpt:
      "Conway's Game of Life lifted off the 2D plane into a 3D cube lattice — neighbours counted in all 26 surrounding cells, the living set rendered as coloured boxes that an orbiting camera circles.",
    cover: `${IMG}/GOL6073.jpg`,
    categories: ["Processing", "Visualisation"],
    status: "wip",
    body: [
      { kind: "h2", text: "Context" },
      {
        kind: "p",
        html: "Conway's Game of Life is the cellular-automaton entry point — a 2D grid of cells that <em>live</em>, <em>die</em> or <em>are born</em> on each tick depending on the count of their eight neighbours. Lift the grid into a third dimension and the neighbourhood balloons from eight cells to twenty-six. The rule thresholds that hold the population stable have to be re-derived; the patterns that emerge are stranger, more brittle, more alien. This sketch is a Processing-based playground for watching that 3D variant evolve.",
      },
      { kind: "h2", text: "How it works" },
      { kind: "h3", text: "The cell space" },
      {
        kind: "p",
        html: "A <code>ConwaysCube</code> backs the simulation — an indexed lattice that tracks which integer coordinates are <em>alive</em> and stretches its extent as the population spreads. Each <code>iterate()</code> step recomputes the next generation by counting the 26 neighbours of every live cell (and of every dead cell adjacent to a live one), then applying the 3D birth/survive rule. The pattern is seeded from a small 2D-slice descriptor at startup, which is convenient for replaying interesting initial states.",
      },
      { kind: "h3", text: "The rule, in code" },
      {
        kind: "p",
        html: "The 2D ruleset (<em>born on 3, survive on 2&ndash;3</em>) doesn't survive contact with 26 neighbours — the population always blows up or starves. The thresholds in this iteration were picked by hand to keep things interesting: a live cell <strong>survives</strong> only with <code>6&ndash;12</code> live neighbours, and a dead cell is <strong>born</strong> when surrounded by <code>11&ndash;15</code> live ones. The bounding box of the search grows by two cells per iteration so a runaway colony has room to expand into.",
      },
      {
        kind: "code",
        lang: "java",
        source: `public void iterate() {
  ConwaysCube buffer = clone();
  int newMinExtent = getMinExtent() - 2;
  int newPosExtent = getPosExtent() + 2;

  range(newMinExtent, newPosExtent).forEach(x ->
    range(newMinExtent, newPosExtent).forEach(y ->
      range(newMinExtent, newPosExtent).forEach(z -> {
        int alive = buffer.countAliveNeighbours(x, y, z);
        if (buffer.isAlive(x, y, z) && (5 >= alive || alive >= 13)) {
          put(x, y, z, '.');                 // dies
        } else if (!buffer.isAlive(x, y, z)
                   && 11 <= alive && alive <= 15) {
          put(x, y, z, '#');                 // born
        }
      })));
}

public int countAliveNeighbours(int x, int y, int z) {
  int alive = 0;
  for (int i = -1; i <= 1; i++) {
    for (int j = -1; j <= 1; j++) {
      for (int k = -1; k <= 1; k++) {
        if (i == 0 && j == 0 && k == 0) continue;  // skip self
        if (isAlive(x + i, y + j, z + k)) alive++;
      }
    }
  }
  return alive;
}`,
      },
      { kind: "h3", text: "Rendering the living set" },
      {
        kind: "p",
        html: "The renderer walks the cube's coordinates and emits one <code>box(10)</code> per live cell, translated to its world-space position. RGB is tied to the absolute value of each axis (<code>|x|</code>, <code>|y|</code>, <code>|z|</code>), so the further a cell sits from the origin the deeper its tint — a quiet way of giving the cluster three-dimensional legibility without lighting tricks.",
      },
      {
        kind: "code",
        lang: "java",
        source: `private void drawCubes(int extent) {
  cube.getCoords().stream().forEach(t -> {
    if (cube.isAlive(t._1, t._2, t._3)) {
      pushMatrix();
      translate(t._1 * scaleC, t._2 * scaleC, t._3 * scaleC);
      stroke(abs(t._1) * 4 * colourScale / 5,
             abs(t._2) * 4 * colourScale / 5,
             abs(t._3) * 4 * colourScale / 5);
      fill(abs(t._1) * colourScale,
           abs(t._2) * colourScale,
           abs(t._3) * colourScale);
      box(10);
      popMatrix();
    }
  });
}`,
      },
      { kind: "h3", text: "The orbiting camera" },
      {
        kind: "p",
        html: "Every frame the camera advances by <code>0.2°</code> around the origin, with the orbit radius and elevation tied to the mouse — <code>mouseX</code> pushes the camera back, <code>mouseY</code> tilts it above or below the equator. The radius also scales with the live cube's extent, so a colony that explodes outward gets framed automatically instead of running off the canvas.",
      },
      { kind: "h3", text: "The step machine" },
      {
        kind: "p",
        html: "The renderer redraws constantly, but the simulation only ticks once per second — enough time to read the population, parse the shape, anticipate what's about to die. A simple <em>last-tick</em> timestamp gates the call to <code>cube.iterate()</code>. A HUD in the top-left prints the iteration number, the count of alive cells, and a short hash of the current state — useful when hunting for periodic configurations.",
      },
      { kind: "h2", text: "Controls" },
      {
        kind: "code",
        lang: "keymap",
        source: `space      pause / resume the simulation
s          save the current frame as GOL###.png
mouse-X    push the camera in / out
mouse-Y    raise / lower the camera`,
      },
      { kind: "h2", text: "Status" },
      {
        kind: "p",
        html: "<em>Under construction</em> — the source still needs a longer write-up on the rule selection, the hashing scheme used for cycle detection, and a clip of a few of the more arresting initial conditions running to fixed-point. More to come.",
      },
    ],
  },
];
