/* tslint:disable:max-line-length  */

import NativeShape, { getPath, getRect } from "shape-svg";

export const ExportCSS = (selector: any) => {
    return `.exportCSS({
    selector: (item, selectors) =>   {
      return ${"`"}${"${"}utils.splitComma(selectors).map((selector) =>  {
        return "${selector}:hover " + selector.replace("${selector}", ""); }).join(", ")}${"`"};
    },
  }).setTime(0);
  `;
};
export const ExportMouse = (selector: any, num: any) => {
    return `.setTime(0);
  var element${num} = document.querySelector("${selector}");
  element${num}.addEventListener("mouseenter", () =>  {
    scene${num}.getPlayState() !== "running" && scene${num}.play();
  });
  element${num}.addEventListener("mouseleave", () =>  {
    scene${num}.finish();
  });
  `;
};
export const DirectionCode = (direction: any) => {
    return `
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
  });/*play*/`;
};

export const DelayCode = () => {
    return `
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
};
export const IterationCountCode = (iterationCount: string, i: any) => `
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
export const FillModeCode = (fillMode: any) => {
    return `
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
    delay: 0.5,
    duration: 1,
    easing: "ease-in-out",
    selector: true,
    fillMode: "${fillMode}",
  });/*play*/
  `;
};
export const EasingCode = (easing: any) => {
    return `
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
};
export const PlaySpeedCode = (playSpeed: any) => {
    return `
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
};

export const NumberCode = () => `
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
export const UnitCode = () => `
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
export const StringCode = () => {
    return `
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
};
export const ColorCode = (color: any[]) => `
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

export const ArrayCode = () => {
    return `
  var arrayTextElement = document.querySelector("#array .text");
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
};
export const ObjectCode = () => {
    return `
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
  `;
};

export const TimelineCode = () => {
    return `
  var clapperScene = new Scene({
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
};

export const KeyframerCode = () => `
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
  var keyframesObject = Keyframer.getKeyframes("keyframer_keyframes");

  new Scene.SceneItem(keyframesObject)
    .setIterationCount("infinite")
    .setDuration(1)
    .setSelector("[data-keyframer] .rect")
    ;/*play*/
  `;

export const ProgressCode = () => {
    return `
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
  var playEl = document.querySelector("[data-progress] .play");
  var progressEl = document.querySelector("[data-progress] .progress");
  var duration = scene.getDuration();

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
};

export const LineDrawingCode = () => {
    return `
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
};

const rect1 = getPath(getRect({ left: 10, side: 3, split: 20, strokeWidth: 5 }).points);
const rect2 = getPath(getRect({ left: 10, side: 3, split: 10, innerRadius: 30, strokeWidth: 5 }).points);
const rect3 = getPath(getRect({ left: 10, side: 5, split: 12, strokeWidth: 5 }).points);
const rect4 = getPath(getRect({ left: 10, side: 5, split: 6, innerRadius: 30, strokeWidth: 5 }).points);

export const MorphingCode = () => {
    return `
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
};

export const PlayMethodCode = () => {
    return `
  var keyframes = {
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
};

export const FadeInCode = () => {
    return `
  Scene
    .fadeIn({ duration: 1 })
    .setSelector("[data-fadein] .target")
    ;/*play*/
  `;
};
export const TypingCode = () => {
  return `
  /*mouse*/new Scene({
    "[data-typing] .text span":
      Scene.typing({
        text: "Make a typing effect with Scene.js.",
        duration: 7,
      }),
    "[data-typing] .cursor": {
      0: { opacity: 0 },
      0.5: { opacity: 0 },
      "0.5>": { opacity: 1 },
      1: { opacity: 1 },
      options: {
        iterationCount: "infinite",
      }
    },
  }, {
    selector: true,
  });/*play*/
`;
};
export const FadeOutCode = () => {
    return `
  Scene
    .fadeOut()
    .setDuration(1)
    .setSelector("[data-fadeout] .target")
    ;/*play*/
  `;
};
export const BlinkCode = () => {
    return `
  Scene
    .blink({ duration: 1 })
    .setSelector("[data-blink] .target")
    ;/*play*/
  `;
};
export const WipeInCode = () => {
    return `
  Scene
    .wipeIn({ duration: 1 })
    .setSelector("[data-wipein] .target")
    ;/*play*/
  `;
};
export const WipeOutCode = () => {
    return `
  Scene
    .wipeOut({ duration: 1 })
    .setSelector("[data-wipeout] .target")
    ;/*play*/
  `;
};
export const ZoomInCode = () => {
    return `
  Scene
    .zoomIn({ duration: 1 })
    .setSelector("[data-zoomin] .target")
    ;/*play*/
  `;
};
export const ZoomOutCode = () => {
    return `
  Scene
    .zoomOut({ duration: 1 })
    .setSelector("[data-zoomout] .target")
    ;/*play*/
  `;
};
export const ShakeCode = () => {
    return `
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
};
export const ShakeXCode = () => {
    return `
  Scene
    /* shakeX({ x: "5px", frequency: 10 }) */
    .shakeX()
    .setDuration(0.2)
    .setIterationCount("infinite")
    .setSelector("[data-shakex] .target")
    ;/*play*/
  `;
};
export const ShakeYCode = () => {
    return `
  Scene
    /* shakeY({ y: "5px", frequency: 10 }) */
    .shakeY()
    .setDuration(0.2)
    .setIterationCount("infinite")
    .setSelector("[data-shakey] .target")
    ;/*play*/
  `;
};
export const FlipXCode = () => {
    return `
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
};
export const FlipYCode = () => {
    return `
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
};
export const FlipCode = () => {
    return `
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
};
export const TransitionCode = () => {
    return `
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
};
export const ExportCode = () => {
    return `
  /*
  # export mp4
  $ render -i index.html --name scene
  # export only mp3
  $ render -i index.html --name scene -o output.mp3
  # export mp3 file and mp4 file
  $ render -i index.html --name scene -o output.mp3,output.mp4


  -b, --bitrate [value]  Bitrate of video (the higher the bit rate, the clearer the video quality) (defaults to "4096k")
  -c, --cache <n>        you can pass Capture. (0: false, 1: true) (defaults to 0)
  -C, --codec            Codec to encode video If you don't set it up, it's the default(mp4: libx264, webm:libvpx-vp9) (defaults to "")
  -d, --duration <n>     how many seconds to play (defaults to 0)
  -f, --fps <n>          fps (defaults to 60)
  -h, --height <n>       Video height to render (defaults to 1080)
  -H, --help             Output usage information
  -i, --input [value]    File URL to Rendering (defaults to "index.html")
  -I, --iteration <n>    iterationCount of the Scene set by the user himself. (defaults to 0)
  -m, --media [value]    Name of mediaScene to render (defaults to "mediaScene")
  -M, --multi <n>        Number of processes to create. (defaults to 1)
  -n, --name [value]     Name of scene to render (defaults to "scene")
  -o, --output [value]   Output file name (defaults to "output.mp4")
  -p, --port <n>         Port to Rendering (defaults to 3033)
  -s, --scale <n>        Scale of screen size (defaults to 1)
  -S, --startTime <n>    Time to start (defaults to 0)
  -v, --version          Output the version number
  -w, --width <n>        Video width to render (defaults to 1920)
  */
  `;
};
export const Example = (example, i, id, html, code) => {
    return `
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
        <script type="text/example" data-id="${id}" data-value="${example.value}">${(example.code || code || ((v, i) => { }))(example.value, i) } </script>
    </div>
    </div>`;
}
export const Feature = feature => {
    return `
  <div class="feature" id="${feature.id}">
      <h4 class="name">${feature.title}</h4>
      <p class="description">${feature.description || ""}</p>
      <div class="examples">
          ${feature.examples.map((example, i) => Example(example, i, feature.id, feature.html, feature.code)).join("")}
      </div>
  </div>`;
};
const Page = page => {
    return `
  <h2 id="${page.title.replace(/\s/g, "-").toLowerCase()}">${page.title}</h2>
  <p class="description">${page.description || ""}</p>
  ${page.features.map(feature => Feature(feature)).join("")}
  `;
};

export const Pages = pages => {
    return pages.map(page => Page(page)).join("");
};

export const FeatureNavigation = feature => {
    return `
  <li>
      <a href="#${feature.id}">${feature.title}</a>
  </li>
  `;
};

export const Navigation = page => {
    return `
  <li class="parent">
      <a href="#${page.title.replace(/\s/g, "-").toLowerCase()}">${page.title}</a>
      <ul>
          ${page.features.map(feature => FeatureNavigation(feature)).join("")}
      </ul>
  </li>
  `;
};
export const Navigations = pages => pages.map(page => Navigation(page)).join("");
