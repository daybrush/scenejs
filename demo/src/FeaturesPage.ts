import Page from "@daybrush/page";
import { add } from "./Store";
import { $, addEvent, toArray } from "@daybrush/utils";
import NativeScene, { IEasingFunction, SceneItem, setRole } from "../../src";

declare var Scene: typeof NativeScene & {
    EASE_IN: IEasingFunction;
    EASE_IN_OUT: IEasingFunction;
    LINEAR: IEasingFunction;
    SceneItem: typeof SceneItem;
    setRole: typeof setRole;
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
    selector: `.page2 [data-feature="progress"]:hover .icon2 .thumb`,
});

new Scene({
    ".page2 .icon3 svg path": {
        "0": {
            "stroke-dasharray": "4450 4450",
        },
        "0>": {
            "stroke-dasharray": "0 5000",
        },
        "0.8": {
            "stroke-dasharray": "1400 5000",
        },
        "1.6": {
            "stroke-dasharray": "2500 4450",
        },
        "2.7": {
            "stroke-dasharray": "4450 4450",
        },
        "3": {

        },
    },
}, {
    iterationCount: "infinite",
    easing: Scene.EASE_IN,
    selector: true,
}).exportCSS({
    selector: `.page2 [data-feature="svg"]:hover .icon3 path`,
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
addEvent(valueFeatureElement, "mouseenter", () => {
    icon5Scene.getPlayState() !== "running" && icon5Scene.play();
});
addEvent(valueFeatureElement, "mouseleave", () => {
    icon5Scene.pause();
});

const page2 = new Page(".page.page2");

add(page2);
