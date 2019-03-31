import { $, addClass, removeClass, toArray } from "@daybrush/utils";
import { pages } from "./Store";
import { scroll } from "./utils";

const header = $("header");
const menus = $(`header [data-item] a`, true);

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
    });
});
pages.forEach((page, i) => {
    if (i % 2 === 0) {
        return;
    }
    page.range(["window - 80", "100% - 80"]).on({
        enter: e => {
            addClass(header, "white");
        },
        exit: e => {
            removeClass(header, "white");
        },
    });
});
