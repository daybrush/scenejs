import { oval, poly } from "shape-svg";
import NativeScene, { EasingFunction } from "../../../src";
import Page from "@daybrush/page";
import { add } from "./Store";
import { $, addEvent } from "@daybrush/utils";

declare var Scene: typeof NativeScene & {
    EASE_IN_OUT: EasingFunction,
};
interface Media extends NativeScene {
    getVolume(): number;
    setVolume(volume: number): this;
    setPlaySpeed(playSpeed: number): this;
    seek(fromTime: number, toTime: number): this;
}
declare var MediaScene: new () => NativeScene & { addMedia: (filename) => Media };

const clapper = document.querySelector(".clapper");

function makeShadow(element, func, options, left = 10, top = 15) {
    const target = func({
        left,
        top,
        opacity: 1,
        ...options,
    });

    func({
        left: left * 2,
        top: top * 2,
        opacity: 0.2,
        ...options,
    }, target);

    element.appendChild(target);

    return target;
}

const radius = 50;

for (let i = 1; i <= 6; ++i) {
    const size = (170 - (i - 1) * 20);
    const stroke = radius * 12 / size;
    const ir = radius - stroke;

    const target = makeShadow(clapper, oval, {
        "className": `svg_circle svg_circle${i} center`,
        "r": ir,
        "strokeWidth": stroke,
        "strokeLinejoin": "round",
        "stroke-linecap": "round",
        "stroke": "#333",
        "rotate": -360,
        "origin": "50% 50%",
    }, 5, 5);

    target.style.cssText = `width: ${size}px; height: ${size}px;`;
}

makeShadow(clapper, poly, {
    className: "play_btn back",
    side: 3,
    width: 60,
    strokeWidth: 8,
    strokeLinejoin: "round",
    rotate: 90,
    stroke: "#333",
    fill: "#333",
    origin: "50% 50%",
});
makeShadow(clapper, poly, {
    className: "play_btn front",
    side: 3,
    width: 60,
    strokeWidth: 8,
    strokeLinejoin: "round",
    rotate: 90,
    stroke: "#333",
    fill: "#333",
    origin: "50% 50%",
});

const nextStep = 2.6;
const nextStep2 = nextStep + 3;
const nextStep3 = nextStep2 + 1.6;

const EASE_IN_OUT = Scene.EASE_IN_OUT;

const scene = new Scene({
    ".logo1 .scene1.circle": i => ({
        0: {
            transform: "scale(0)",
        },
        0.2: {
            "border-width": "50px",
        },
        0.5: {
            opacity: 1,
        },
        1: {
            "transform": "scale(1)",
            "border-width": "0px",
            "opacity": 0,
        },
        options: {
            delay: i * 0.4,
        },
    }),
    ".logo1 ellipse": (i, el) => {
        const opacity = el.getAttribute("opacity");
        const index = Math.floor(i / 2);

        return {
            0: {
                "opacity": 0,
                "stroke-dasharray": "0 1000",
                "transform": `scaleX(${index % 2 ? -1 : 1}) rotate(${-90 + index * 180}deg)`,
            },
            0.1: {
                opacity,
            },
            [0.6]: {
                "stroke-dasharray": `${70} 1000`,
                "stroke-dashoffset": 0,
            },
            [1.1 - index * 0.06]: {
                opacity,
            },
            [1.2 - index * 0.06]: {
                "stroke-dashoffset": -76,
                "stroke-dasharray": "0 1000",
                "transform": `rotate(${180 + index * 180}deg)`,
                "opacity": 0,
            },
            options: {
                delay: nextStep + index * 0.16,
            },
        };
    },
    ".play_btn.back": {
        0: {
            transform: "translate(-50%, -50%) translate2(3px) scale(1)",
        },
        1: {
            transform: "scale(0.5)",
        },
        2: {
            transform: "scale(1)",
        },
        options: {
            delay: nextStep + 1,
        },
    },
    ".play_btn.front": {
        0: {
            transform: "translate(-50%, -50%) translate2(3px) scale(0)",
        },
        1: {
            transform: "scale(1)",
        },
        options: {
            delay: nextStep + 2.4,
        },
    },
    ".play_circle": {
        0: {
            transform: "translate(-50%, -50%) scale(0)",
        },
        1: {
            transform: "scale(1)",
        },
        options: {
            delay: nextStep + 2.1,
        },
    },
    ".background": {
        0: {
            transform: "translate(-50%, -50%) scale(0)",
        },
        1: {
            transform: "scale(1)",
        },
        options: {
            delay: nextStep + 1.8,
        },
    },
    ".stick1 .rect": i => ({
        0: {
            transform: {
                scale: 0,
                skew: "15deg",
            },
        },
        0.7: {
            transform: {
                scale: 1,
            },
        },
        options: {
            delay: nextStep2 - 0.2 + i * 0.22,
        },
    }),
    ".stick2 .rect": i => ({
        0: {
            transform: {
                scale: 0,
                skew: "-15deg",
            },
        },
        0.7: {
            transform: {
                scale: 1,
            },
        },
        options: {
            delay: nextStep2 + i * 0.22,
        },
    }),
    ".stick1": {
        0: {
            transform: {
                rotate: "0deg",
            },
        },
        0.5: {
            transform: {
                rotate: "-20deg",
            },
        },
        1: {
            transform: {
                rotate: "0deg",
            },
        },
        1.5: {
            transform: {
                rotate: "-10deg",
            },
        },
        options: {
            delay: nextStep3,
            easing: EASE_IN_OUT,
        },
    },
    ".logo1 .clapper": {
        0: {
            transform: "rotate(0deg)",
        },
        0.5: {
            transform: "rotate(-15deg)",
        },
        1: {
            transform: "rotate(0deg)",
        },
        1.5: {
            transform: "rotate(-10deg)",
        },
        options: {
            delay: nextStep3,
            easing: EASE_IN_OUT,
        },
    },
    ".logo1 .character .left": i => ({
        0: {
            transform: {
                translateX: "-100%",
            },
        },
        1: {
            transform: {
                translateX: "0%",
            },
        },
        options: {
            delay: nextStep2 + i * 0.1,
        },
    }),
    ".logo1 .character .right": i => ({
        0: {
            transform: {
                translateX: "100%",
            },
        },
        1: {
            transform: {
                translateX: "0%",
            },
        },
        options: {
            delay: nextStep2 + i * 0.1,
        },
    }),
    ".logo1 .description p span": i => ({
        0: {
            transform: {
                translateY: "-100%",
            },
        },
        1: {
            transform: {
                translateY: "0%",
            },
        },
        options: {
            delay: nextStep3 + 0.5 + i * 0.2,
        },
    }),
}, {
        easing: EASE_IN_OUT,
        selector: true,
    });

const mediaScene = new MediaScene();

mediaScene
    .addMedia("./clapper.mp3")
    .seek(0, 0.452)
    .setPlaySpeed(2)
    .setVolume(0.7)
    .setDelay(nextStep3 + 0.9);
(window as any).mediaScene = mediaScene;
addEvent($<HTMLElement>(".play_btn.front"), "click", () => {
    scene.playCSS(false);
    mediaScene.play();
});
const page1 = new Page(".page.page1");

page1.range(["10%", "90%"]).on({
    firstEnter: () => {
        scene.exportCSS();
    },
    enter: () => {
        scene.playCSS(false);
        mediaScene.play();
    },
});
page1.on("exit", () => {
    scene.finish();
    mediaScene.finish();
});

add(page1);
