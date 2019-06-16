import {
    DirectionCode, DelayCode, IterationCountCode, FillModeCode,
    EasingCode, PlaySpeedCode, NumberCode, UnitCode, StringCode,
    ColorCode, ArrayCode, ObjectCode, TimelineCode, KeyframerCode,
    ProgressCode, LineDrawingCode, MorphingCode, PlayMethodCode, BlinkCode, FadeInCode, FadeOutCode,
    WipeInCode, WipeOutCode, ZoomInCode, ZoomOutCode, ShakeCode, ShakeXCode,
    ShakeYCode, FlipCode, FlipXCode, FlipYCode, TransitionCode, ExportCode, TypingCode,
} from "./page";

/* tslint:disable:max-line-length  */

export const datas = [
    {
        title: "Options",
        features: [
            {
                id: "direction",
                title: "direction",
                description: "The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.",
                code: DirectionCode,
                html: `<div class="rects"><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div></div>`,
                examples: [
                    {
                        value: "normal",
                        title: `direction: normal (default)`,
                    },
                    {
                        value: "reverse",
                        title: `direction: reverse`,
                    },
                    {
                        value: "alternate",
                        title: `direction: alternate`,
                    },
                    {
                        value: "alternate-reverse",
                        title: `direction: alternate-reverse`,
                    },
                ],
            },
            {
                id: "delay",
                title: "delay",
                description: "The delay property specifies a delay for the start of an animation.",
                code: DelayCode,
                html: `
          <div class="circles">
            <div class="circle circle1"></div>
            <div class="circle circle2"></div>
          </div>
          `,
                examples: [
                    {
                        title: "",
                        value: "",
                    },
                ],
            },
            {
                id: "iterationcount",
                title: "iterationCount",
                description: "The iterationCount property specifies the number of times an animation should be played.",
                code: IterationCountCode,
                html: `
          <div class="circles">
            <div class="circle circle1"></div>
            <div class="circle circle2"></div>
            <div class="circle circle3"></div>
          </div>`,
                examples: [
                    {
                        title: "iterationCount: 1 (default)",
                        value: 1,
                    },
                    {
                        title: "iterationCount: 2",
                        value: 2,
                    },
                    {
                        title: "iterationCount: infinite",
                        value: "infinite",
                    },
                ],
            },
            {
                id: "fillmode",
                title: "fillMode",
                description: "The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).",
                code: FillModeCode,
                html: `
          <div class="pie fill">
    <div class="half left">
      <div class="semicircle"></div>
    </div>
    <div class="half right">
      <div class="semicircle"></div>
    </div>
  </div>
          `,
                examples: [
                    {
                        title: "fillMode: forwards (default)",
                        value: "forwards",
                    },
                    {
                        title: "fillMode: backwards",
                        value: "backwards",
                    },
                    {
                        title: "fillMode: both",
                        value: "both",
                    },
                ],
            },
            {
                id: "easing",
                title: "easing",
                description: "The easing(timing-function) specifies the speed curve of an animation.",
                code: EasingCode,
                html: `<div class="rects"><div class="rect rect1"></div><div class="rect rect2"></div><div class="rect rect3"></div><div class="rect rect4"></div></div>`,
                examples: [
                    {
                        title: "easing: linear (default)",
                        value: "linear",
                    },
                    {
                        title: "easing: ease",
                        value: "ease",
                    },
                    {
                        title: "easing: ease-in",
                        value: "ease-in",
                    },
                    {
                        title: "easing: ease-out",
                        value: "ease-out",
                    },
                    {
                        title: "easing: ease-in-out",
                        value: "ease-in-out",
                    },
                    {
                        title: "easing: steps(6, end)",
                        value: "steps(6, end)",
                    },
                    {
                        title: "easing: cubic-bezier(0.74, 0, 0.42, 1.47)",
                        value: "cubic-bezier(0.74, 0, 0.42, 1.47)",
                    },
                ],

            },
            {
                id: "playspeed",
                title: "playSpeed",
                description: "The playspeed define the speed at which the play is performed.",
                html: `
          <div class="chase">
          <svg viewBox="0 0 100 100">
            <ellipse fill="transparent" cx="50" cy="50" rx="49.5" ry="49.5" stroke-linejoin="round" stroke-width="1" stroke-linecap="round" stroke="#999"></ellipse></svg>
          <div class="dot"></div>
        </div>
          `,
                code: PlaySpeedCode,
                examples: [
                    {
                        title: "playSpeed: 1 (default)",
                        value: 1,
                    },
                    {
                        title: "playSpeed: 2",
                        value: 2,
                    },
                ],
            },
        ],
    },
    {
        title: "Values",
        features: [
            {
                id: "number",
                title: "Number",
                description: "In order to interpolate, it must be a number by default.",
                html: `
          <div class="squares">
          <div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div>
          <div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div>
          <div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div>
          </div>`,
                code: NumberCode,
                examples: [
                    {
                        title: "opacity: 0 to 1",
                        value: [0, 1],
                    },
                ],
            },
            {
                id: "unit",
                title: "Unit",
                description: "10px, 10%, 10em, etc. is a string that represents a number but has a unit. In this case, number and unit are divided and only numbers are interpolated.",
                html: `
          <div class="overflow">
            <div class="text"><span>Scene.js</span></div>
          </div>
          <div class="overflow">
            <div class="text"><span>CSS</span></div>
          </div>
          <div class="overflow">
            <div class="text"><span>Animation</span></div>
          </div>

          `,
                code: UnitCode,
                examples: [
                    {
                        title: "100% to 0%",
                        value: "unit",
                    },
                ],
            },
            {
                id: "string",
                title: "String",
                description: "string indicates the first value before the time of 1, and then the second value when it is 1 because it determines that it cannot be interpolated.",
                html: `<div class="text center"></div>`,
                code: StringCode,
                examples: [
                    {
                        title: "Typing",
                        value: "string",
                    },
                ],
            },
            {
                id: "colors",
                title: "Colors",
                description: "It supports color models such as hex, rgb(a), and hsl(a).",
                html: `<div class="target center"></div>`,
                code: ColorCode,
                examples: [
                    {
                        title: "#000 to #ff5555",
                        value: ["#000", "#ff5555"],
                    },
                    {
                        title: "#000 to rgba(255, 100, 100, 1)",
                        value: ["#000", "rgba(255, 100, 100, 1)"],
                    },
                    {
                        title: "#000 to hsla(0, 100%, 67%, 1)",
                        value: ["#000", "hsla(0, 100%, 67%, 1)"],
                    },
                ],
            },
            {
                id: "array",
                title: "Array",
                description: "Interpolates the value of the array.",
                html: `<div class="text center"></div>`,
                code: ArrayCode,
                examples: [
                    {
                        title: "[0, 0, 0] to [200, 100, 50]",
                        value: [0, 0, 0],
                    },
                ],
            },
            {
                id: "object",
                title: "Object",
                description: "Interpolates the value of the object.",
                html: `<div class="loading">
          <div class="circle left top"></div>
          <div class="circle left bottom"></div>
          <div class="circle right bottom"></div>
          <div class="circle right top"></div>
        </div>`,
                code: ObjectCode,
                examples: [
                    {
                        title: "transform",
                        value: "transform",
                    },
                ],
            },
        ],
    },
    {
        title: "Timeline",
        description: "", // Scene.js is timeline-based animation library like CSS keyframes. That's why you can control time with your own hands.
        features: [
            {
                id: "timeline",
                title: "Timeline",
                description: `<a href="https://github.com/daybrush/scenejs-timeline" target="_blank">@scenejs/timeline</a> is a library that represents the timeline of Scene.js. You can control time, properties, and items.`,
                html: `
  <div class="clapper">
    <div class="clapper-container">
      <div class="clapper-body">
        <div class="top">
          <div class="stick stick1">
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
          </div>
          <div class="stick stick2">
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
      <div class="circle"></div>
      <div class="play">
      <svg class="__shape-svg" viewBox="0 0 70 77.73502691896255">
        <path d="M 60 38.86751345948127 L 10.000000000000021 67.73502691896255 L 10 10 L 60 38.86751345948127 Z" fill="#333" stroke-linejoin="round" stroke-width="10" stroke="#333"></path></svg>
      </div>
    </div>
  </div>
          `,
                code: TimelineCode,
                examples: [
                    {
                        title: "",
                        value: "",
                    },
                ],
            },
            {
                id: "keyframer",
                title: "Keyframer",
                description: `<a href="https://github.com/daybrush/keyframer" target="_blank">keyframer</a> is a library that ake the CSS Keyframes the keyframes object. play CSS keyframes.`,
                html: `
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
          <div class="rects"><div class="rect"></div></div>
          `,
                code: KeyframerCode,
                examples: [{ value: "" }],
            },
            {
                id: "progress",
                title: "Progress",
                description: "You can create a player that can tell progress from 0% to 100% over time and control the scene.",
                html: `
          <div class="circles">
            <div class="circle circle1"></div>
            <div class="circle circle2"></div>
            <div class="circle circle3"></div>
          </div>
          <div class="player">
            <div class="play"></div>
            <input class="progress" type="range" value="0" min="0" max="100"/>
          </div>`,
                code: ProgressCode,
                examples: [
                    {
                        title: "",
                        value: "",
                    },
                ],
            },
        ],
    },
    {
        title: "SVG Animation",
        features: [
            {
                id: "linedrawing",
                title: "Line Drawing",
                description: "You can create handwriting-like effects with the css property called <strong>stroke-dasharray</strong>.",
                code: LineDrawingCode,
                html: `
  <svg class="svg" width="100%" height="100%" viewBox="0 0 500 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/">
      <g transform="matrix(0.5,0,0,0.5,0,0)">
          <g id="Artboard1" transform="matrix(0.966957,0,0,0.675155,-748.037,-365.425)">
              <rect x="773.599" y="541.246" width="1034.17" height="592.456" style="fill:none;"/>
              <g id="Layer1" transform="matrix(1.03417,0,0,1.48114,773.599,520.51)">
                  <path stroke="#333" stroke-width="20" stroke-linecap="round" fill="transparent" d="M14.072,282.172C62.055,287.178 211.405,258.288 232.093,106.803C245.183,10.95 175.634,38.769 175.274,121.466C174.696,254.303 345.708,276.667 261.505,364.848C223.868,404.264 162.843,365.295 135.844,332.678C44.912,222.821 174.741,290.734 226.944,314.06C305.751,349.274 394.038,317.424 421.116,157.12C440.884,40.084 426.007,37.332 405.238,178.8C374.39,388.93 525.241,428.727 604.056,135.659C631.833,32.372 590.153,120.492 700.477,128.771C765.675,133.664 906.434,99.5 899.092,83.529C888.047,59.504 651.522,134.399 689.798,210.4C715.743,261.917 824.613,253.598 880.128,185.618C925.485,130.077 888.739,57.951 897.887,113.597C922.461,263.076 786.919,398.343 713.414,373.936C695.57,368.011 688.743,349.213 700.318,334.202C754.291,264.208 948.931,261.515 988.492,282.759" style="fill:none;"/>
              </g>
          </g>
      </g>
  </svg>`,
                examples: [{
                    title: "",
                    value: "",
                }],
            },
            {
                id: "morph",
                title: "Morph Shape",
                description: "In <strong>path</strong> SVGElement, you can transform the shape through the attribute <strong>d</strong>.",
                code: MorphingCode,
                html: `
  <svg class="svg" viewBox="0 0 120 120">
    <path stroke="#333" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="transparent"/>
  </svg>`,
                examples: [{
                    title: "",
                    value: "",
                }],
            },
        ],
    },
    {
        title: "Controls",
        features: [
            {
                id: "jscss",
                title: "Play JavaScript & Play CSS",
                description: "Scene.js supports both JavaScript and CSS play methods.",
                html: `
          <div class="play-method play-method-js">
            <h5>Play JavaScript</h5>
            <div class="clapper">
              <div class="clapper-container">
                <div class="clapper-body">
                  <div class="top">
                    <div class="stick stick1">
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                    </div>
                    <div class="stick stick2">
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                    </div>
                  </div>
                  <div class="bottom"></div>
                </div>
                <div class="circle"></div>
                <div class="play">
                  <svg class="__shape-svg" viewBox="0 0 70 77.73502691896255">
                    <path d="M 60 38.86751345948127 L 10.000000000000021 67.73502691896255 L 10 10 L 60 38.86751345948127 Z" fill="#333" stroke-linejoin="round" stroke-width="10" stroke="#333"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="play-method play-method-css">
          <h5>Play CSS</h5>
            <div class="clapper">
              <div class="clapper-container">
                <div class="clapper-body">
                  <div class="top">
                    <div class="stick stick1">
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                    </div>
                    <div class="stick stick2">
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                      <div class="rect"></div>
                    </div>
                  </div>
                  <div class="bottom"></div>
                </div>
                <div class="circle"></div>
                <div class="play">
                  <svg class="__shape-svg" viewBox="0 0 70 77.73502691896255">
                    <path d="M 60 38.86751345948127 L 10.000000000000021 67.73502691896255 L 10 10 L 60 38.86751345948127 Z" fill="#333" stroke-linejoin="round" stroke-width="10" stroke="#333"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>`,
                code: PlayMethodCode,
                examples: [{
                    title: "",
                    value: "",
                }],
            },
            // {
            //   id: "media",
            //   title: "Play media (video, audio)",
            //   description: `<a href="https://github.com/daybrush/scenejs-media" target="_blank">@scenejs/media</a> is a library for playing or controlling media with Scene.js`,
            //   html: "1",
            //   code: () => "",
            //   examples: [{value: ""}],
            // },
            // {
            //   id: "iframe",
            //   title: "Play animation in iframe",
            //   description: `<a href="https://github.com/daybrush/scenejs-iframe" target="_blank">@scenejs/iframe</a> is A library that control the animation of iframe with Scene.js`,
            //   html: "1",
            //   code: () => "",
            //   examples: [{value: ""}],
            // },
        ],
    },
    {
        title: "Effects",
        description: `<a href="https://github.com/daybrush/scenejs-effects" target="_blank">@scenejs/effects</a> is a library that can create various animation effects in <a href="https://github.com/daybrush/scenejs" target="_blank">scenejs</a>.`,
        features: [
            {
                id: "typing",
                title: "typing",
                description: "Make a typing effect that is typed one character at a time like a typewriter. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.typing\" target=\"_blank\">.typing</a>)",
                html: `<div class="text center"><span></span><div class="cursor"></div></div>`,
                code: TypingCode,
                examples: [{ value: "" }],
            },
            {
                id: "fadein",
                title: "fadeIn",
                description: "Make a fade in effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.fadeIn\" target=\"_blank\">.fadeIn</a>)",
                html: `<div class="target center">1</div>`,
                code: FadeInCode,
                examples: [{ value: "" }],
            },
            {
                id: "fadeout",
                title: "fadeOut",
                description: "Make a fade out effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.fadeIn\" target=\"_blank\">.fadeIn</a>)",
                html: `<div class="target center">1</div>`,
                code: FadeOutCode,
                examples: [{ value: "" }],
            },
            {
                id: "blink",
                title: "blink",
                description: "Make a blinking effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.blink\" target=\"_blank\">.blink</a>)",
                html: `<div class="target center">1</div>`,
                code: BlinkCode,
                examples: [{ value: "" }],
            },
            {
                id: "wipein",
                title: "wipeIn",
                description: "Make a wipe in effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.wipeIn\" target=\"_blank\">.wipeIn</a>)",
                html: `<div class="target center">1</div>`,
                code: WipeInCode,
                examples: [{ value: "" }],
            },
            {
                id: "wipeout",
                title: "wipeOut",
                description: "Make a wipe out effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.wipeOut\" target=\"_blank\">.wipeOut</a>)",
                html: `<div class="target center">1</div>`,
                code: WipeOutCode,
                examples: [{ value: "" }],
            },
            {
                id: "zoomin",
                title: "zoomIn",
                description: "Make a zoom in effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.zoomIn\" target=\"_blank\">.zoomIn</a>)",
                html: `<div class="target center">1</div>`,
                code: ZoomInCode,
                examples: [{ value: "" }],
            },
            {
                id: "zoomout",
                title: "zoomOut",
                description: "Make a zoom out effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.zoomOut\" target=\"_blank\">.zoomOut</a>)",
                html: `<div class="target center">1</div>`,
                code: ZoomOutCode,
                examples: [{ value: "" }],
            },
            {
                id: "shake",
                title: "shake",
                description: "Make a shake effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shake\" target=\"_blank\">.shake</a>)",
                html: `<div class="target center">1</div><div class="target2 center">2</div>`,
                code: ShakeCode,
                examples: [{ value: "" }],
            },
            {
                id: "shakex",
                title: "shakeX",
                description: "Make a horizontal shake effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shakeX\" target=\"_blank\">.shakeX</a>)",
                html: `<div class="target center">1</div>`,
                code: ShakeXCode,
                examples: [{ value: "" }],
            },
            {
                id: "shakey",
                title: "shakeY",
                description: "Make a vertical shake effect. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shakeY\" target=\"_blank\">.shakeY</a>)",
                html: `<div class="target center">1</div>`,
                code: ShakeYCode,
                examples: [{ value: "" }],
            },
            {
                id: "flip",
                title: "flip",
                description: "You can create a flip effect horizontally, vertically, or diagonally. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flip\" target=\"_blank\">.flip</a>)",
                html: `<div class="flip target center">1</div><div class="flip target2 center">2</div>`,
                code: FlipCode,
                examples: [{ value: "" }],
            },
            {
                id: "flipx",
                title: "flipX",
                description: "You can create an effect that flips vertically around the x-axis. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flipX\" target=\"_blank\">.flipX</a>)",
                html: `<div class="flip target center">1</div><div class="flip target2 center">2</div>`,
                code: FlipXCode,
                examples: [{ value: "" }],
            },
            {
                id: "flipy",
                title: "flipY",
                description: "You can create an effect that flips horizontally around the y-axis. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flipY\" target=\"_blank\">.flipY</a>)",
                html: `<div class="flip target center">1</div><div class="flip target2 center">2</div>`,
                code: FlipYCode,
                examples: [{ value: "" }],
            },
            {
                id: "transition",
                title: "transition",
                description: "Switch the scene from `item1` to `item2`. (see: <a href=\"https://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.transition\" target=\"_blank\">.transition</a>)",
                html: `<div class="flip target center">1</div><div class="flip target2 center">2</div>`,
                code: TransitionCode,
                examples: [{ value: "" }],
            },
        ],
    },
    {
        title: "Rendering",
        features: [
            {
                id: "mp4",
                title: "Export MP4",
                description: `You can export CSS Animation to a video file with simple commands using <a href="https://ffmpeg.org/" target="_blank">ffmpeg</a> and <a href="https://github.com/daybrush/scenejs-render" target="_blank">@scenejs/render</a>. <br/><br/> <a href="https://daybrush.com/scenejs/release/latest/examples/clapper.html" target="_blank">Original Source</a>`,
                html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/rb-5xBKyCeE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                code: ExportCode,
                examples: [{ value: "" }],
            },
        ],
    },
];
