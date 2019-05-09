const DirectionCode = (direction) => `
new Scene({
  "[data-direction='${direction}'] .rect": i => ({
    "transform": {
      scale: [0, 1],
    },
    "border-width": [${"`${"}30 + i * 5}px${"`"}, "0px"],
    options: {
      duration: 1,
      delay: i * 0.1,
    }
  }),
}, {
  easing: "ease-in-out",
  selector: true,
  direction: "${direction}",
  iterationCount: 2,
}).play();
`;

const DelayCode = (delay) => `
new Scene({
  "#delay .circle1": {
    0: {
      transform: "translate(-50%, -50%) scale(0)",
      "border-width": "100px",
    },
    1: {
      transform: "scale(1)",
      "border-width": "0px",
    },
  },
  "#delay .circle2": {
    0: {
      transform: "translate(-50%, -50%) scale(0)",
      "border-width": "100px",
    },
    1: {
      transform: "scale(1)",
      "border-width": "0px",
    },
    options: {
      delay: 0.5,
    }
  },
}, {
  selector: true,
}).play();
`;
const IterationCountCode = (iterationCount, i) => `
new Scene({
  "[data-iterationcount='${iterationCount}'] .circle": i => ({
    0: {
      transform: "translate(-50%, -50%) scale(0)",
      "border-width": "100px",
      opacity: 1,
    },
    1: {
      transform: "scale(1)",
      "border-width": "0px",
      opacity: 0.3,
    },
    options: {
      delay: i * 0.3,
    }
  }),
}, {
  selector: true,
  iterationCount: ${iterationCount === "infinite" ? '"infinite"' : iterationCount},
}).play();
`;
const FillModeCode = (fillMode) => `
new Scene({
  "[data-fillmode='${fillMode}'] .pie, [data-fillmode='${fillMode}'] .half.left .semicircle": {
    transform: {
      rotate: ["0deg", "180deg"],
    }
  },
  "[data-fillmode='${fillMode}'] .half.right .semicircle": {
    transform: {
      rotate: ["0deg", "-180deg"],
    }
  }
}, {
  duration: 1,
  easing: "ease-in-out",
  selector: true,
  fillMode: "${fillMode}",
}).play();
`;
const EasingCode = (easing, i) => `
new Scene({
  "#easing .example:nth-child(${i + 1}) .rect": i => ({
    "transform": {
      scale: [0, 1],
    },
    "border-width": [${"`${"}30 + i * 5}px${"`"}, "0px"],
    options: {
      duration: 1,
      delay: i * 0.1,
    }
  }),
}, {
  easing: "${easing}",
  selector: true,
}).play();
`;
const PlaySpeedCode = (playSpeed) => `
new Scene({
  "[data-playspeed='${playSpeed}'] .chase .dot": {
    0: {
      transform: "rotate(0deg) translate(0px, -99px) scale(1)",
    },
    2: {
      transform: "rotate(360deg) scale(0.1)",
    },
  },
  "[data-playspeed='${playSpeed}'] .chase ellipse": {
    0: {
     "stroke-dasharray": "0 1000",
    },
    2: {
      "stroke-dasharray": "311 1000",
    },
  },
}, {
  selector: true,
  playSpeed: ${playSpeed},
  easing: "ease",
}).play();
`;

const NumberCode = number => `
new Scene({
  "[data-number='0,1'] .square": i => ({
    opacity: [0, 1],
    options: {
      duration: 1,
      delay: (i % 7) * 0.1 + Math.floor(i / 7) * 0.2,
    }
  }),
}, {
  selector: true,
}).play();
`;
const UnitCode = () => `
new Scene({
  ".overflow .text span": i => ({
    0: {
      transform: {
        translateY: "100%",
      }
    },
    1: {
      transform: {
        translateY: "0%",
      }
    },
    options: {
      delay: i * 0.2,
    }
  }),
}, {
  easing: "ease-in-out",
  selector: true,
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
new Scene({
  "[data-object] .circle": i => ({
    0: {
      transform: {
        rotate: ${"`${"}-90 * i}deg${"`"}, 
        translate: "0%, 0%",
      },
    },
    1: {
      transform: {
        translate: "180%, 0%",
      },
    },
  }),
}, {
  selector: true,
  iterationCount: "infinite",
  easing: "ease-in-out",
}).play();
`

const TimelineCode = () => `
const clapperScene = new Scene({
  ".clapper": {
    2: "transform: translate(-50%, -50%) rotate(0deg)",
    2.5: "transform: rotate(-15deg)",
    3: "transform: rotate(0deg)",
    3.5: "transform: rotate(-10deg)",
  },
  ".clapper-container" : {
    0: Scene.zoomIn({ duration: 1 }),
  },
  ".circle": {
    0.3: Scene.zoomIn({ duration: 1 }),
  },
  ".play": {
    0: "transform: translate(-50%, -50%)",
    0.6: Scene.zoomIn({ duration: 1 }),
  },
  ".top .stick1": {
    2: "transform: rotate(0deg)",
    2.5: "transform: rotate(-20deg)",
    3: "transform: rotate(0deg)",
    3.5: "transform: rotate(-10deg)",
  },
  ".stick1 .rect": i => ({
    0: "transform: scale(0) skew(15deg)",
    0.7: "transform: scale(1)",
    options: { delay: 0.6 + i * 0.1 },
  }),
  ".stick2 .rect": i => ({
    0: "transform: scale(0) skew(-15deg)",
    0.7: "transform: scale(1)",
    options: { delay: 0.8 + i * 0.1 },
  }),
}, {
  easing: "ease-in-out",
  iterationCount: "infinite",
  selector: true,
});


new Timeline(
  clapperScene,
  document.querySelector("#keyframes .example_result"),
  { keyboard: false },
);
`;


const Example = (example, i, id, html, code) => `
<div class="example" data-${id}="${example.value}">
  <div class="example_wrapper left">
      <h5>${example.title}</h5>
      <div class="example_result">
          <div class="container">
              ${example.html || (typeof html === "function" ? html(example.title) : html)}
          </div>
      </div>
    </div>
    <div class="example_wrapper right">
      <pre><code class="code javascript"></code></pre>
      <script type="text/example">${(example.code || code || (() => {}))(example.value, i)}</script>
    </div>
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
