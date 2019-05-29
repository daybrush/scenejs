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
import NativeScene from 'scenejs';
import { findDOMNode } from 'react-dom';
import { SceneInterface } from './SceneInterface';
var Scene = /*#__PURE__*/ (function (_super) {
    __extends(Scene, _super);
    function Scene(props) {
        var _this = _super.call(this, props) || this;
        _this.item = new NativeScene({}, {});
        return _this;
    }
    Scene.prototype.render = function () {
        return this.props.children;
    };
    Scene.prototype.componentDidMount = function () {
        var element = findDOMNode(this);
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
}(SceneInterface));
export { Scene };
//# sourceMappingURL=Scene.js.map