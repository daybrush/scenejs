import set from "./set";
/**
 * Make a fade in effect.
 * @memberof Scene.presets
 * @func fadeIn
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.fadeIn({duration: 2});
Scene.presets.fadeIn({duration: 2});
// Same
new SceneItem({
    "0%": {
        opacity: 0,
    },
    "100%": {
        opacity: 1,
    }
}, {
    duration: 2,
});
 */
export default function fadeIn(_a) {
    var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c;
    return set("opacity", [from, to], arguments[0]);
}
//# sourceMappingURL=fadeIn.js.map