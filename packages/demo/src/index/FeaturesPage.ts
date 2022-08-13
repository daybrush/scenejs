import Page from "@daybrush/page";
import { add } from "./Store";
import { $, addEvent, toArray } from "@daybrush/utils";
import NativeScene, { EasingFunction, SceneItem, setRole } from "scenejs";

declare var Scene: typeof NativeScene & {
    EASE_IN: EasingFunction;
    EASE_IN_OUT: EasingFunction;
    LINEAR: EasingFunction;
    SceneItem: typeof SceneItem;
    setRole: typeof setRole;
    flipY: any,
};
new Scene({
    ".page2 .icon1 .lang": i => ({
        0: {
            "border-color": "#f55",
            "color": "#f55",
        },
        0.5: {
            "border-color": "#f55",
            "color": "#f55",
        },
        1.5: {
            "border-color": "#fff",
            "color": "#fff",
        },
        2: {
            "border-color": "#fff",
            "color": "#fff",
        },
        options: {
            direction: i ? "alternate-reverse" : "alternate",
            iterationCount: "infinite",
        },
    }),
}, {
    easing: Scene.EASE_IN_OUT,
    selector: true,
}).setTime(0).exportCSS({
    selector: (_, selector) => {
        return `.page2 [data-feature="play"]:hover .icon1 ${selector}`;
    },
});

new Scene({
    ".page2 .icon2 .thumb": {
        0: {
            transform: {
                translate: "-50%, -50%",
                translate2: "0px",
            },
        },
        1: {
            transform: {
                translate2: "100px",
            },
        },
    },
}, {
    iterationCount: "infinite",
    direction: "alternate",
    easing: Scene.EASE_IN_OUT,
    selector: true,
}).exportCSS({
    selector:
        `.page2 [data-feature="progress"]:hover .icon2 .thumb, .page2 [data-feature="progress"]:focus .icon2 .thumb`,
});

new Scene({
    ".page2 .icon3 svg path": {
        "0": {
            "stroke-dasharray": "4450 4450",
        },
        "0>": {
            "stroke-dasharray": "0 4450",
        },
        "0.3": {
            "stroke-dasharray": "360 4450",
        },
        "1.2": {
            "stroke-dasharray": "1400 4450",
        },
        "2": {
            "stroke-dasharray": "2400 4450",
        },
        "2.6": {
            "stroke-dasharray": "3000 4450",
        },
        "3.1": {
            "stroke-dasharray": "4450 4450",
        },
        "3.5": {

        },
    },
}, {
    iterationCount: "infinite",
    easing: Scene.EASE_IN,
    selector: true,
}).exportCSS({
    selector: `.page2 [data-feature="svg"]:hover .icon3 path, .page2 [data-feature="svg"]:focus .icon3 path`,
}).setTime(0);

new Scene({
    ".page2 .icon4 .play_bar": {
        0: {
            left: "0%",
        },
        2: {
            left: "100%",
        },
    },
}, {
        iterationCount: "infinite",
        easing: Scene.LINEAR,
        selector: true,
    }).exportCSS({
        selector: `.page2 [data-feature="timeline"]:hover .icon4 .play_bar`,
    });
const valueFeatureElement = $(`.page2 [data-feature="value"]`);

Scene.setRole(["text"], true);

const icon5Scene = new Scene({
    ".slide": i => ({
        1.5: {
            transform: `translateY(-50%) translate(${i * 100}%)`,
        },
        2.5: {
            transform: `translate(${(i - 1) * 100}%)`,
        },
        4: {
            transform: `translateY(-50%) translate(${(i - 1) * 100}%)`,
        },
        5: {
            transform: `translate(${(i - 2) * 100}%)`,
        },
        options: {
            easing: Scene.EASE_IN_OUT,
        },
    }),
    ".slide:nth-child(1) .target": {
        0: {
            opacity: 1,
        },
        1: {
            opacity: 0,
        },
    },
    ".slide:nth-child(2) .target": {
        0: {
            "background-color": "rgb(255, 255, 255)",
        },
        1: {
            "background-color": "rgb(255, 90, 90)",
        },
        options: {
            delay: 2.5,
        },
    },
    ".slide:nth-child(3) .target": {
        0: {
            "font-weight": "bold",
            "background": "transparent",
            "text": "",
        },
        0.12: {
            text: "S",
        },
        0.24: {
            text: "Sc",
        },
        0.36: {
            text: "Sce",
        },
        0.48: {
            text: "Scen",
        },
        0.60: {
            text: "Scene",
        },
        0.72: {
            text: "Scene.",
        },
        0.84: {
            text: "Scene.j",
        },
        0.96: {
            text: "Scene.js",
        },
        2: {

        },
        options: {
            delay: 5,
        },
    },
}, {
    iterationCount: "infinite",
    selector: true,
}).setTime(0);

const descriptionElements = toArray($(".page2 .slide .sub_description", true));

icon5Scene.getItem(".slide:nth-child(1) .target").on("animate", e => {
    const el = descriptionElements[0];

    el.innerHTML = `opacity: ${e.frame.get("opacity").toFixed(2)}`;
});
icon5Scene.getItem(".slide:nth-child(2) .target").on("animate", e => {
    const el = descriptionElements[1];

    el.innerHTML = `${e.frame.get("background-color")}`;
});
icon5Scene.getItem(".slide:nth-child(3) .target").on("animate", e => {
    const el = e.currentTarget.elements[0];

    el.innerHTML = `${e.frame.get("text")}`;
});

const icon6Scene = new Scene({
    ".icon6 .card-rotor": {
        0: Scene.flipY({ y: 2, duration: 2 }),
    },
    ".icon6 .bottom": {
        0: {
            transform: "translateX(-50%) scaleX(4)",
        },
        0.5: {
            transform: "scaleX(1)",
        },
        options: {
            iterationCount: 4,
            direction: "alternate",
        },
    }
}, {
    easing: "linear",
    direction: "alternate",
    iterationCount: "infinite",
    selector: true,
}).exportCSS({
    selector: (item, selector) => `.page2 [data-feature="effect"]:hover ${selector}`,
}).setTime(0);

toArray($(".page2 li .feature", true)).forEach(el => {
    addEvent(el, "click", () => {});
});

addEvent(valueFeatureElement, "mouseenter", () => {
    icon5Scene.getPlayState() !== "running" && icon5Scene.play();
});
addEvent(valueFeatureElement, "mouseleave", () => {
    icon5Scene.pause();
});

const page2 = new Page(".page.page2");

add(page2);
