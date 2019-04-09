const datas = [
  {
    title: "Options",
    features: [
      {
        id: 'direction',
        title: 'direction',
        description: 'The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.',
        code: DirectionCode,
        html: `<div class="target"></div>`,
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
            value: "normal",
            title: `direction: alternate (default)`,
          },
          {
            value: "normal",
            title: `direction: alternate-reverse (default)`,
          },
        ],
      },
      {
        id: 'delay',
        title: 'delay',
        description: 'The delay property specifies a delay for the start of an animation.',
        code: DelayCode,
        html: `
        <div class="content"><div class="target delay0"></div><h5>delay: 0 (default)</h5></div>
        <div class="content"><div class="target delay1"></div><h5>delay: 1</h5></div>
        `,
        examples: [
          {
            title: "₩   ",
            value: 1,
          },
        ],
      },
      {
        id: "iterationcount",
        title: "iterationCount",
        description: "The iterationCount property specifies the number of times an animation should be played.",
        code: IterationCountCode,
        html: `<div class="target"></div>`,
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
        <div class="content"><div class="target backwards"></div><h5>fillMode: backwards (default)</h5></div>
        <div class="content"><div class="target both"></div><h5>fillMode: both</h5></div>
        `,
        examples: [
          {
            title: "",
            value: "backwards",
          },
        ],
      },
      {
        id: "easing",
        title: "easing",
        description: "The easing(timing-function) specifies the speed curve of an animation.",
        code: EasingCode,
        html: (title) => `
                <div class="content"><div class="target default"></div><h5>linear (default)</h5></div>
                <div class="content"><div class="target easing"></div><h5>${title}</h5></div>
                `,
        examples: [
          {
            title: "ease",
            value: "EASE",
          },
          {
            title: "ease-in",
            value: "EASE_IN",
          },
          {
            title: "ease-out",
            value: "EASE_OUT",
          },
          {
            title: "ease-in-out",
            value: "EASE_IN_OUT",
          },
          {
            title: "steps(4, \"end\")",
            value: "steps(4, \"end\")",
          },
          {
            title: "cubic-bezier(0.74, 0, 0.42, 1.47)",
            value: "bezier(0.74, 0, 0.42, 1.47)",
          },
        ],

      },
      {
        id: "playspeed",
        title: "playSpeed",
        description: "The playspeed define the speed at which the play is performed.",
        html: `
        <div class="content"><div class="target speed1"></div><h5>playSpeed: 1 (default)</h5></div>
        <div class="content"><div class="target speed2"></div><h5>playSpeed: 2</h5></div>
        `,
        code: PlaySpeedCode,
        examples: [
          {
            title: "",
            value: 1,
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
        description: "내적을 하기 위해서는 기본적으로 숫자여야 합니다.",
        html: `<div class="target center"></div>`,
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
        description: "값 중 10px, 10%, 10em등 과 같이 숫자를 나타내지만 단위가 있어 문자열인 경우입니다. 이 경우는 number과 unit을 나눠 숫자만 내적합니다.",
        html: `<div class="target"></div>`,
        code: UnitCode,
        examples: [
          {
            title: "0% to 100%",
            value: [0, 100]
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
        html: `<div class="target center"></div>`,
        code: ObjectCode,
        examples: [
          {
            title: "transform",
            value: "transform"
          }
        ],
      },
    //   {
    //     id: "functions ",
    //     title: "Functions",
    //     description: "값이 동적으로 바뀌는 경우가 있습니다. 그런 경우 함수를 넣을 수 있으며 그 결과 값을 내적합니다.",
    //     html: "",
    //     code: () => { },
    //     examples: [
    //       {
    //         title: "from 0px to 100px",
    //         value: [0, 100]
    //       }
    //     ],
    //   },
    ],
  },
  {
    title: "Timeline",
    features: [
      {
        id: "keyframes",
        title: "Keyframes",
        description: "",
        html: `<div class="target center"></div>`,
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
