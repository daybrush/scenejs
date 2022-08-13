import { $, addClass, removeClass, toArray, addEvent, hasClass } from "@daybrush/utils";
import { pages } from "./Store";
import { scroll } from "./utils";
import NativeScene, { EasingFunction } from "scenejs";
import { NONAME } from "dns";

declare var Scene: typeof NativeScene & {
    EASE_IN_OUT: EasingFunction,
};

const body = document.body;
const nav = $(`nav`);
const navButon = $(`.nav_button`);
const menus = $(`nav [data-item] a`, true);
const navScene = new Scene({
    "nav": {
        0: {
            "background-color": "rgba(255, 255, 255, 0)",
        },
        0.5: {
            "background-color": "rgba(255, 255, 255, 0.7)",
        },
    },
    "nav .half": {
        0.2: {
            transform: {
                translate: "-100%",
                translate2: "-15vw",
            },
        },
        1.1: {
            transform: {
                translate: "0%",
                translate2: "0vw",
            },
        },
    },
    "nav li": i => ({
        0: {
            opacity: 0,
            transform: "translate(-50px)",
        },
        0.3: {
            opacity: 1,
            transform: "translate(0px)",
        },
        options: {
            delay: 0.9 + i * 0.1,
        },
    }),
}, {
    easing: Scene.EASE_IN_OUT,
    selector: true,
}).on({
    play: () => {
        nav.style.display = "block";
    },
    ended: () => {
        if (navScene.getDirection() === "reverse") {
            nav.style.display = "none";
        } else {
            nav.style.display = "block";
        }
    },
});
function enterNav() {
    if (hasClass(body, "navigate") || (navScene.getPlayState() === "running" && navScene.getDirection() === "normal")) {
        return;
    }
    addClass(body, "navigate");
    navScene.pause();
    navScene.setPlaySpeed(1);
    navScene.setDirection("normal");
    navScene.setTime(0);
    navScene.play();
}
function exitNav() {
    if (!hasClass(body, "navigate") ||
        (navScene.getPlayState() === "running" && navScene.getDirection() === "reverse")) {
        return;
    }
    removeClass(body, "navigate");
    navScene.pause();
    navScene.setPlaySpeed(1.5);
    navScene.setDirection("reverse");
    navScene.setTime(0);
    navScene.play();
}
toArray(menus).forEach((menu, i) => {
    const page = pages[i];

    page.range(["window - 1", "window"]).on({
        enter: e => {
            addClass(menu, "enter");
        },
        exit: e => {
            removeClass(menu, "enter");
        },
    });
    menu.addEventListener("click", e => {
        e.preventDefault();
        scroll(page.getRect(true).top);
        exitNav();
    });
});
$("header .logo").addEventListener("click", e => {
    e.preventDefault();
    scroll(pages[0].getRect(true).top);
    exitNav();
});
addEvent(nav, "click", e => {
    if (e.target === nav) {
        exitNav();
    }
});
addEvent(navButon, "click", () => {
    if (hasClass(body, "navigate")) {
        exitNav();
    } else {
        enterNav();
    }
});


pages.forEach((page, i) => {
    if (i % 2 === 0) {
        return;
    }
    page.range(["window - 80", "100% - 80"]).on({
        enter: e => {
            addClass(body, "white");
        },
        exit: e => {
            removeClass(body, "white");
        },
    });
});
