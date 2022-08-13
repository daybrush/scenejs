import { Pages, Navigations, ExportMouse, ExportCSS } from "./page";
import { datas } from "./data";
import * as nativeUtils from "@daybrush/utils";
import "./css/index.css";
import "./css/monokai-sublime.css";

declare var utils: typeof nativeUtils;
declare var hljs: any;

document.querySelector(".container_overview")!.insertAdjacentHTML("beforeend", Pages(datas));
document.querySelector(".classes")!.innerHTML = Navigations(datas);

let exportMouseCount = 0;
utils.toArray(document.querySelectorAll(".feature")).forEach(feature => {
    utils.toArray(feature.querySelectorAll(".example")).forEach(example => {
        const exampleScript = example.querySelector("script");
        const code = exampleScript.innerText.trim();
        const showCode = code
            .replace("/*mouse*/", "")
            .replace(/;\/\*play\*\//g, ".play();")
            .replace(";/*playcss*/", ".playCSS();");
        example.querySelector<HTMLElement>(".code").innerText = showCode;

        const script = document.createElement("script");
        const id = exampleScript.getAttribute("data-id");
        const value = exampleScript.getAttribute("data-value");
        const selector = `[data-${id}${value ? `='${value}'` : ""}]`;
        let scriptCode = code;

        if (code.indexOf("/*mouse*/") > -1) {
            scriptCode = scriptCode
                .replace("/*mouse*/", `var scene${++exportMouseCount} = `)
                .replace(/;\/\*play\*\//g, ExportMouse(selector, exportMouseCount))
                .replace(";/*playcss*/", ExportCSS(selector));
        } else {
            scriptCode = scriptCode.replace(/;\/\*play\*\//g, ExportCSS(selector));
        }
        utils.addEvent(example, "click", e => {
            // e.preventDefault();
        });
        script.innerHTML = scriptCode;

        example.appendChild(script);
    });
});
hljs.initHighlightingOnLoad();
