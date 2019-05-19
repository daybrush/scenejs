const ExportCSS = (selector) => `.exportCSS({
  selector: (item, selectors) => {
    return ${"`"}${"${"}utils.splitComma(selectors).map(selector => "${selector}:hover " + selector.replace("${selector}", "")).join(", ")}${"`"};
  }
}).setTime(0);
`;
const ExportMouse = (selector, num) => `.setTime(0);
var element${num} = document.querySelector("${selector}");
element${num}.addEventListener("mouseenter", () => {
  scene${num}.getPlayState() !== "running" && scene${num}.play();
});
element${num}.addEventListener("mouseleave", () => {
  scene${num}.finish();
});
`;
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
});/*play*/`

const DelayCode = (delay) => `
new Scene({
  "[data-delay] .circle1": {
    0: {
      transform: "translate(-50%, -50%) scale(0)",
      "border-width": "100px",
    },
    1: {
      transform: "scale(1)",
      "border-width": "0px",
    },
  },
  "[data-delay] .circle2": {
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
  iterationCount: "infinite",
  selector: true,
});/*play*/
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
});/*play*/
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
  delay: 1,
  duration: 1,
  easing: "ease-in-out",
  selector: true,
  fillMode: "${fillMode}",
});/*play*/
`;
const EasingCode = (easing, i) => `
new Scene({
  "[data-easing='${easing}'] .rect": i => ({
    "transform": {
      scale: [0, 1],
    },
    "border-width": [${"`${"}30 + i * 5}px${"`"}, "0px"],
    "options": {
      duration: 1,
      delay: i * 0.1,
    }
  }),
}, {
  easing: "${easing}",
  selector: true,
});/*play*/
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
});/*play*/
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
});/*play*/
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
});/*play*/
`;
const StringCode = (_, i) => `
/*mouse*/new Scene.SceneItem({
  attribute: {
    "data-text": [
      "",
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
  selector: "#string .text",
});/*play*/
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
  selector: "[data-colors='${color}'] .target",
});/*play*/
`;

const ArrayCode = () => `
const arrayTextElement = document.querySelector("#array .text");
/*mouse*/new Scene.SceneItem({
  0: {
    arr: [0, 0, 0],
  },
  1: {
    arr: [200, 100, 50],
  },
}).on("animate", e => {
  arrayTextElement.innerHTML =
    e.frame.get("arr").map(num => num.toFixed(0))
});/*play*/
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
});/*play*/
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
  ".clapper .circle": {
    0.3: Scene.zoomIn({ duration: 1 }),
  },
  ".clapper .play": {
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
  selector: (selector) => "[data-timeline] " + selector,
});
new Timeline(
  clapperScene,
  document.querySelector("#timeline .example_result"),
  { keyboard: false },
);
`;


const KeyframerCode = selector => `
/*
<style>
@keyframes keyframer_keyframes {
  7.69% {
    border-width:35px;
    transform: translate(-50%, -50%) scale(0);
  }
  84.61% {
    border-width: 0px;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    border-width: 0px;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
*/
const keyframesObject = Keyframer.getKeyframes("keyframer_keyframes");

new Scene.SceneItem(keyframesObject)
  .setIterationCount("infinite")
  .setDuration(1)
  .setSelector("[data-keyframer] .rect")
  ;/*play*/
`;

const ProgressCode = (selector) => `
var scene = new Scene({
  "[data-progress] .circle": i => ({
    0: {"border-width": "150px", opacity: 1, transform: "translate(-50%, -50%) scale(0)"},
    1.5: {"border-width": "0px", opacity: 0.3, transform: "scale(0.7)"},
    options: {
      delay: i * 0.4,
    },
  }),
}, {
  easing: "ease-in-out",
  fillMode: "forwards",
  selector: true,
}).setTime(0);
const playEl = document.querySelector("[data-progress] .play");
const progressEl = document.querySelector("[data-progress] .progress");
const duration = scene.getDuration();

scene.on("play", e => {
  playEl.className = "pause";
});
scene.on("paused", e => {
  playEl.className = "play";
})
scene.on("animate", e => {
  progressEl.value = 100 * e.time / duration;
});
playEl.addEventListener("click", e => {
  scene.isPaused() ? scene.play() : scene.pause();
});
progressEl.addEventListener("input", e => {
  scene.pause();
  scene.setTime(progressEl.value + "%");
});
`;

const LineDrawingCode = (selector) => `
new Scene({
  "[data-linedrawing] svg path": {
      "0": "stroke-dasharray: 4450 4450",
      "0>": "stroke-dasharray: 0 4450",
      "0.3": "stroke-dasharray: 360 4450",
      "1.2": "stroke-dasharray: 1450 4450",
      "2": "stroke-dasharray: 2400 4450",
      "2.6": "stroke-dasharray: 3000 4450",
      "3.1": "stroke-dasharray: 4450 4450",
  },
}, {
  iterationCount: "infinite",
  easing: "ease-in",
  selector: true,
});/*play*/
`;
const rect1 = Shape.getPath(Shape.getRect({ left: 10, side: 3, split: 20, strokeWidth: 5 }).points);
const rect2 = Shape.getPath(Shape.getRect({ left: 10, side: 3, split: 10, innerRadius: 30, strokeWidth: 5 }).points);
const rect3 = Shape.getPath(Shape.getRect({ left: 10, side: 5, split: 12, strokeWidth: 5 }).points);
const rect4 = Shape.getPath(Shape.getRect({ left: 10, side: 5, split: 6, innerRadius: 30, strokeWidth: 5 }).points);


const MorphingCode = (selector) => `
/*mouse*/new Scene({
  "[data-morph] svg": {
    transform: {
      rotate: ["0deg", "180deg", "180deg", "0deg"],
    },
  },
  "[data-morph] path": {
    attribute: {
      "d": [
        "${rect1}",
        "${rect2}",
        "${rect3}",
        "${rect4}",
      ],
    },
  },
}, {
  easing: "ease-in-out",
  duration: 3,
  selector: true,
});/*play*/
`;

const PlayMethodCode = () => `
const keyframes = {
  ".clapper": {
    2: "transform: translate(-50%, -50%) rotate(0deg)",
    2.5: "transform: rotate(-15deg)",
    3: "transform: rotate(0deg)",
    3.5: "transform: rotate(-10deg)",
  },
  ".clapper-container" : {
    0: Scene.zoomIn({ duration: 1 }),
  },
  ".clapper .circle": {
    0.3: Scene.zoomIn({ duration: 1 }),
  },
  ".clapper .play": {
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
};
/*mouse*/new Scene(keyframes, {
  selector: selector => ".play-method-js " + selector,
  easing: "ease-in-out",
});/*play*/

new Scene(keyframes, {
  selector: selector => ".play-method-css " + selector,
  easing: "ease-in-out",
});/*playcss*/
`;


const FadeInCode = () => `
Scene
  .fadeIn({ duration: 1 })
  .setSelector("[data-fadein] .target")
  ;/*play*/
`;
const FadeOutCode = () => `
Scene
  .fadeOut()
  .setDuration(1)
  .setSelector("[data-fadeout] .target")
  ;/*play*/
`;
const BlinkCode = () => `
Scene
  .blink({ duration: 1 })
  .setSelector("[data-blink] .target")
  ;/*play*/
`;
const WipeInCode = () => `
Scene
  .wipeIn({ duration: 1 })
  .setSelector("[data-wipein] .target")
  ;/*play*/
`;
const WipeOutCode = () => `
Scene
  .wipeOut({ duration: 1 })
  .setSelector("[data-wipeout] .target")
  ;/*play*/
`;
const ZoomInCode = () => `
Scene
  .zoomIn({ duration: 1 })
  .setSelector("[data-zoomin] .target")
  ;/*play*/
`;
const ZoomOutCode = () => `
Scene
  .zoomOut({ duration: 1 })
  .setSelector("[data-zoomout] .target")
  ;/*play*/
`;
const ShakeCode = () => `
Scene
  .shake()
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shake] .target")
  ;/*play*/

Scene
  .shake({
    properties: {
      transform: {
        /* shakeX */
        translateX: "5px",
        /* shakeY */
        translateY: "5px",
        rotate: "5deg",
        scale: [0.8, 1],
      },
    },
    frequency: 10,
  })
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shake] .target2")
  ;/*play*/
`;
const ShakeXCode = () => `
Scene
  /* shakeX({ x: "5px", frequency: 10 }) */
  .shakeX()
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shakex] .target")
  ;/*play*/
`;
const ShakeYCode = () => `
Scene
  /* shakeY({ y: "5px", frequency: 10 }) */
  .shakeY()
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shakey] .target")
  ;/*play*/
`;
const FlipXCode = () => `
Scene
  /* flipX({ x: 1, backside: false }) */
  .flipX()
  .setDuration(1)
  .setSelector("[data-flipx] .target")
  ;/*play*/
Scene
  .flipX({ backside: true })
  .setDuration(1)
  .setSelector("[data-flipx] .target2")
  ;/*play*/
`;
const FlipYCode = () => `
Scene
  /* flipY({ y: 1, backside: false }) */
  .flipY()
  .setDuration(1)
  .setSelector("[data-flipy] .target")
  ;/*play*/
Scene
  .flipY({ backside: true })
  .setDuration(1)
  .setSelector("[data-flipy] .target2")
  ;/*play*/
`;
const FlipCode = () => `
Scene
  /* flip({ x: 1, y: 1, backside: false }) */
  .flip()
  .setDuration(1)
  .setSelector("[data-flip] .target")
  ;/*play*/
Scene
  .flip({ backside: true })
  .setDuration(1)
  .setSelector("[data-flip] .target2")
  ;/*play*/
`;
const TransitionCode = () =>`
var transitionScene = new Scene({
  "[data-transition] .target": {},
  "[data-transition] .target2": {},
}, {
  delay: 0.1,
  easing: "ease-in-out",
  selector: true,
});
Scene.transition(
  transitionScene.getItem("[data-transition] .target"),
  transitionScene.getItem("[data-transition] .target2"),
  {
    0:  [
      Scene.fadeOut({ duration: 1 }),
      Scene.zoomIn({ from: 1, to: 2, duration: 1 }),
      "opacity: 1; transform: rotate(0deg)",
    ],
    1: "opacity: 0; transform: rotate(40deg)",
  }
);
transitionScene;/*play*/
`;
const ExportCode = () => `
// $ render -i index.html --name scene
// -c, --cache <n>         you can pass Capture. (0: false, 1: true) (defaults to 0)
// -d, --duration          how many seconds to play
// -f, --fps <n>           fps (defaults to 60)
// -h, --height <n>        Video height to render (defaults to 400)
// -H, --help              Output usage information
// -i, --input [value]     File URL to Rendering (defaults to "index.html")
// -m, --media [value]     Name of mediaScene to render (defaults to "mediaScene")
// -M, --multiprocess <n>  Number of processes to create. (defaults to 1)
// -n, --name [value]      Name of scene to render (defaults to "scene")
// -o, --output [value]    Output file name (defaults to "output.mp4")
// -p, --port <n>          Port to Rendering (defaults to 3033)
// -s, --scale <n>         Scale of screen size (defaults to 1)
// -S, --startTime <n>     Time to start (defaults to 0)
// -v, --version           Output the version number
// -w, --width <n>         Video width to render (defaults to 600)
`;
const Example = (example, i, id, html, code) => `
<div class="example" data-${id}="${example.value}">
  <div class="example_wrapper left">
      <h5>${example.title || ""}</h5>
      <div class="example_result">
          <div class="container">
              ${example.html || (typeof html === "function" ? html(example.title) : html)}
          </div>
      </div>
    </div>
    <div class="example_wrapper right">
      <pre><code class="code javascript"></code></pre>
      <script type="text/example" data-id="${id}" data-value="${example.value}">${(example.code || code || (() => {}))(example.value, i)}</script>
    </div>
</div>`;
const Feature = (feature) => `
<div class="feature" id="${feature.id}">
    <h4 class="name">${feature.title}</h4>
    <p class="description">${feature.description || ""}</p>
    <div class="examples">
        ${feature.examples.map((example, i) => Example(example, i, feature.id, feature.html, feature.code)).join("")}
    </div>
</div>`;
const Page = (page) => `
<h2 id="${page.title.replace(/\s/g, "-").toLowerCase()}">${page.title}</h2>
<p class="description">${page.description || ""}</p>
${page.features.map(feature => Feature(feature)).join("")}
`

const Pages = (pages) => pages.map(page => Page(page)).join("");



const FeatureNavigation = feature => `
<li>
    <a href="#${feature.id}">${feature.title}</a>
</li>
`;

const Navigation = (page) => `
<li class="parent">
    <a href="#${page.title.replace(/\s/g, "-").toLowerCase()}">${page.title}</a>
    <ul>
        ${page.features.map(feature => FeatureNavigation(feature)).join("")}
    </ul>
</li>
`;
const Navigations = (pages) => pages.map(page => Navigation(page)).join("");
