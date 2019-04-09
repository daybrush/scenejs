const DirectionCode = (direction) => `
new Scene.SceneItem({
    0: { left: "0%" },
    1: { left: "100%" },
}, {
    selector: ${"`"}[data-direction="${direction}"] .target${"`"},
    direction: "${direction}",
    iterationCount: 2,
}).play();
`;

const DelayCode = (delay) => `
new Scene({
  "#delay .target.delay0": {
    0: { left: "0%" },
    1: { left: "100%" },
  },
  "#delay .target.delay1": {
    0: { left: "0%" },
    1: { left: "100%" },
    options: {
      delay: ${delay},
    }
  },
}, {
  selector: true,
}).play();
`;
const IterationCountCode = (iterationCount, i) => `
new Scene.SceneItem({
    0: { left: "0%" },
    1: { left: "100%" },
}, {
    selector: ${"`"}[data-iterationcount="${iterationCount}"] .target${"`"},
    iterationCount: ${iterationCount === "infinite" ? '"infinite"' : iterationCount},
}).play();
`;
const FillModeCode = (fillMode) => `
new Scene({
  "#fillmode .target.backwards": {
    0: { left: "0%" },
    1: { left: "100%" },
    options: {
      fillMode: "backwards",
    },
  },
  "#fillmode .target.both": {
    0: { left: "0%" },
    1: { left: "100%" },
    options: {
      fillMode: "both",
    },
  },
}, {
  selector: true,
}).play();
`;
const EasingCode = (easing, i) => `
new Scene({
  "#easing .example:nth-child(${i + 1}) .target.default": {
    0: { left: "0%" },
    1: { left: "100%" },
    options: {
      easing: Scene.LINEAR,
    },
  },
  "#easing .example:nth-child(${i + 1}) .target.easing": {
    0: { left: "0%" },
    1: { left: "100%" },
    options: {
      easing: Scene.${easing},
    },
  },
}, {
  selector: true,
}).play();
`;
const PlaySpeedCode = () => `
new Scene({
    "#playspeed .target.speed1": {
      0: { left: "0%" },
      1: { left: "100%" },
      options: {
        playSpeed: 1,
      },
    },
    "#playspeed .target.speed2": {
      0: { left: "0%" },
      1: { left: "100%" },
      options: {
        playSpeed: 2,
      },
    },
  }, {
    selector: true,
  }).play();
`;

const NumberCode = number => `
new Scene.SceneItem({
    0: { opacity: 0 },
    1: { opacity: 1 },
}, {
    selector: "#number .target"
}).play();
`;
const UnitCode = () => `
new Scene.SceneItem({
    0: { left: "0%" },
    1: { left: "100%" },
}, {
    selector: "#unit .target"
}).play();
`;
const StringCode = (_, i) => `
new Scene.SceneItem({
  attribute: {
    "data-text": [
      "S",
      "Sc",
      "Sce",
      "Scen",
      "Scene",
      "Scene.",
      "Scene.j",
      "Scene.js",
    ],
  }
}, {
  duration: 1,
  selector: "#string .example:nth-child(${i + 1}) .text",
}).play();
`;

const ColorCode = (color, i) => `
new Scene.SceneItem({
  0: {
    "background-color": "${color[0]}",
  },
  1: {
    "background-color": "${color[1]}",
  },
}, {
  selector: "#colors .example:nth-child(${i + 1}) .target",
}).play();
`;

const ArrayCode = () => `
const element = document.querySelector("#array .text");
new Scene.SceneItem({
  0: {
    arr: [0, 0, 0],
  },
  1: {
    arr: [200, 100, 50],
  },
}).on("animate", e => {
  element.innerHTML =
    e.frame.get("arr").map(num => num.toFixed(0))
}).play();
`;
const ObjectCode = () => `
new Scene.SceneItem({
  0: {
    transform: {
      translate: "-50px",
      rotate: "0deg",
    },
  },
  1: {
    transform: {
      translate: "50px",
      rotate: "360deg",
    }
  }
}, {
  selector: "#object .target",
  direction: "alternate",
  iterationCount: "infinite",
}).play();
`

const TimelineCode = () => `
const scene = new Scene({
  "#keyframes .target:nth-child(1)": {
    0: {
      transform: {
          translate: "0px",
      },
    },
    1: {
      transform: {
        translate: "100px",
    },
    }
  },
}, {
  selector: true,
});

new Timeline(
  scene,
  document.querySelector("#keyframes .example_result"),
);
`;


const Example = (example, i, id, html, code) => `
<div class="example" data-${id}="${example.value}">
    <div class="example_result">
        <h5>${example.title}</h5>
        <div class="container">
            ${example.html || (typeof html === "function" ? html(example.title) : html)}
        </div>
    </div>
    <pre><code class="code javascript"></code></pre>
    <script type="text/example">${(example.code || code || (() => {}))(example.value, i)}</script>
</div>`;
const Feature = (feature) => `
<div class="feature" id="${feature.id}">
    <h4 class="name">${feature.title}</h4>
    <p class="description">${feature.description}</p>
    <div class="examples">
        ${feature.examples.map((example, i) => Example(example, i, feature.id, feature.html, feature.code)).join("")}
    </div>
</div>`;
const Page = (page) => `
<h2>${page.title}</h2>
${page.features.map(feature => Feature(feature)).join("")}
`

const Pages = (pages) => pages.map(page => Page(page)).join("");



const FeatureNavigation = feature => `
<li>
    <a>${feature.title}</a>
</li>
`;

const Navigation = (page) => `
<li class="parent">
    <a>${page.title}</a>
    <ul>
        ${page.features.map(feature => FeatureNavigation(feature)).join("")}
    </ul>
</li>
`;
const Navigations = (pages) => pages.map(page => Navigation(page)).join("");
