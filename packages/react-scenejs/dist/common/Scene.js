"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var scenejs_1 = require("scenejs");
var react_dom_1 = require("react-dom");
var SceneInterface_1 = require("./SceneInterface");
var Scene = /*#__PURE__*/ (function (_super) {
    __extends(Scene, _super);
    function Scene(props) {
        var _this = _super.call(this, props) || this;
        _this.item = new scenejs_1.default({}, {});
        return _this;
    }
    Scene.prototype.render = function () {
        return this.props.children;
    };
    Scene.prototype.componentDidMount = function () {
        var element = react_dom_1.findDOMNode(this);
        if (this.props.keyframes) {
            var keyframes = this.props.keyframes;
            this.item.load(this.props.keyframes);
        }
        this.item.forEach(function (item) {
            var id = item.getId();
            item.setElement(element.querySelector("[data-scene-id=\"" + id + "\"]"));
            item.setId(id);
        });
        this.init();
    };
    return Scene;
}(SceneInterface_1.SceneInterface));
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map