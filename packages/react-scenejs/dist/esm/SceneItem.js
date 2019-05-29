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
import { SceneItem as NativeSceneItem } from 'scenejs';
import { findDOMNode } from 'react-dom';
import { SceneInterface } from './SceneInterface';
var SceneItem = /*#__PURE__*/ (function (_super) {
    __extends(SceneItem, _super);
    function SceneItem(props) {
        var _this = _super.call(this, props) || this;
        _this.item = new NativeSceneItem();
        return _this;
    }
    SceneItem.prototype.render = function () {
        return this.props.children;
    };
    SceneItem.prototype.componentDidMount = function () {
        this.item.setElement(findDOMNode(this));
        if (this.props.keyframes) {
            this.item.set(this.props.keyframes);
        }
        else {
            this.item.set('0%', this.props.from);
            this.item.set('100%', this.props.to);
        }
        this.init();
    };
    return SceneItem;
}(SceneInterface));
export { SceneItem };
//# sourceMappingURL=SceneItem.js.map