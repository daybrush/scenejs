const datas = [
  {
    title: "Options",
    features: [
      {
        id: 'direction',
        title: 'direction',
        description: 'The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.',
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
        id: 'delay',
        title: 'delay',
        description: 'The delay property specifies a delay for the start of an animation.',
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
            value: 1,
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
            title: 'iterationCount: 2',
            value: 2,
          },
          {
            title: "iterationCount: infinite",
            value: "infinite",
          },
        ],
      },
      {
        id: 'fillmode',
        title: 'fillMode',
        description: 'The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).',
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
            title: "fillMode: backwards (default)",
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
            title: "playSpeed: 1.5",
            value: 1.5,
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
            value: [0, 1]
          }
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
          }
        ],
      },
      {
        id: "string",
        title: "String",
        description: "내적할 수 없다고 판단하며 시간이 1이 되기 전 첫 번째 값을 나타내며 1이 되면 두 번째 값으로 나타냅니다.",
        html: `<div class="text center"></div>`,
        code: StringCode,
        examples: [
          {
            title: "Typing",
            value: "string",
          }
        ],
      },
      {
        id: "colors",
        title: "Colors",
        description: "hex, rgb(a), hsl(a)같은 color model을 지원합니다. 이러한 color model도 숫자로 나타낼 수 있으며 숫자끼리 내적합니다.",
        html: `<div class="target center"></div>`,
        code: ColorCode,
        examples: [
          {
            title: "#000 to #ff5555",
            value: ["#000", "#ff5555"]
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
        description: "배열의 원소 값을 내적합니다",
        html: `<div class="text center"></div>`,
        code: ArrayCode,
        examples: [
          {
            title: "[0, 0, 0] to [200, 100, 50]",
            value: [0, 0, 0]
          }
        ],
      },
      {
        id: "object",
        title: "Object",
        description: "object의 value값을 내적합니다.",
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
            value: "transform"
          }
        ],
      },
    ],
  },
  {
    title: "Timeline",
    features: [
      {
        id: "keyframes",
        title: "Keyframes",
        description: "",
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
          <div class="play"></div>
        </div>
      </div>
        `,
        code: TimelineCode,
        examples: [
            {
                title: "",
                value: "",
            }
        ],
      },
      {
        id: "progress",
        title: "Progress",
        description: "",
        examples: [],
      },
      {
        id: "player",
        title: "Player",
        description: "",
        examples: [],
      },
    ],
  },
  {
    title: "SVG Animation",
    features: [
      {
        id: "linedrawing",
        title: "Line Drawing",
        description: "",
        examples: [],
      },
      {
        id: "morphing",
        title: "Morphing",
        description: "",
        examples: [],
      },
    ],
  },
  {
    title: "Controls",
    features: [
      {
        id: "js",
        title: "Javascript Animation",
        description: "",
        examples: [],
      },
      {
        id: "css",
        title: "CSS Animation",
        description: "",
        examples: [],
      },
    ],
  },
  {
    title: "Presets",
    features: [
      {
        id: "blink",
        title: "blink",
        description: "",
        examples: [],
      },
      {
        id: "fadeIn",
        title: "fadeIn",
        description: "",
        examples: [],
      },
      {
        id: "fadeOut",
        title: "fadeOut",
        description: "",
        examples: [],
      },
      {
        id: "transition",
        title: "transition",
        description: "",
        examples: [],
      },
      {
        id: "wipeIn",
        title: "wipeIn",
        description: "",
        examples: [],
      },
      {
        id: "wipeOut",
        title: "wipeOut",
        description: "",
        examples: [],
      },
      {
        id: "zoomIn",
        title: "zoomIn",
        description: "",
        examples: [],
      },
      {
        id: "zoomOut",
        title: "zoomOut",
        description: "",
        examples: [],
      },
    ],
  },
  {
    title: "Rendering",
    features: [
      {
        id: "mp4",
        title: "Export MP4",
        description: "",
        examples: [],
      },
    ],
  },
];
