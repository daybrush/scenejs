import set from "./set";
/**
 * Make a zoom out effect.
 * @memberof Scene.presets
 * @func zoomOut
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 1] start zoom
 * @param {number}[options.to = 0] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.zoomOut({duration: 2});
Scene.presets.zoomOut({duration: 2});
// Same
new SceneItem({
    "0%": {
        "transform": "scale(1)",
    },
    "100%": {
        "transform": "scale(0)",
    }
}, {
    duration: 2,
});
 */
export default function zoomOut(_a) {
    var _b = _a.from, from = _b === void 0 ? 1 : _b, _c = _a.to, to = _c === void 0 ? 0 : _c;
    return set(["transform", "scale"], [from, to], arguments[0]);
}
//# sourceMappingURL=zoomOut.js.map