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
import { Component } from 'react';
import { OPTIONS, EVENTS } from 'scenejs';
var SceneInterface = /*#__PURE__*/ (function (_super) {
    __extends(SceneInterface, _super);
    function SceneInterface() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.events = {
            play: function (e) { return _this.props.onPlay(e); },
            paused: function (e) { return _this.props.onPaused(e); },
            ended: function (e) { return _this.props.onEnded(e); },
            timeupdate: function (e) { return _this.props.onTimeUpdate(e); },
            iteration: function (e) { return _this.props.onIteration(e); },
            animate: function (e) { return _this.props.onAnimate(e); },
        };
        return _this;
    }
    SceneInterface.prototype.render = function () {
        return this.props.children;
    };
    SceneInterface.prototype.componentDidUpdate = function () {
        if (this.props.time !== -1 && (this.props.autoplay === false || this.item.getPlayState() === 'paused')) {
            this.item.setTime(this.props.time);
        }
    };
    SceneInterface.prototype.componentWillUnmount = function () {
        this.item.off();
    };
    SceneInterface.prototype.setTime = function (time) {
        this.item.setTime(time);
    };
    SceneInterface.prototype.getTime = function () {
        return this.item.getTime();
    };
    SceneInterface.prototype.play = function () {
        this.props.css !== false ? this.item.playCSS() : this.item.play();
    };
    SceneInterface.prototype.pause = function () {
        this.item.pause();
    };
    SceneInterface.prototype.getItem = function () {
        return this.item;
    };
    SceneInterface.prototype.getDuration = function () {
        return this.item.getDuration();
    };
    SceneInterface.prototype.init = function () {
        var _this = this;
        var item = this.item;
        var events = this.events;
        var sceneOptions = {};
        OPTIONS.forEach(function (name) {
            sceneOptions[name] = _this.props[name];
        });
        item.setOptions(sceneOptions);
        EVENTS.forEach(function (name) {
            _this.item.on(name, events[name]);
        });
        if (this.props.autoplay !== false) {
            this.play();
        }
        else if (this.props.time !== -1) {
            this.setTime(this.props.time);
        }
    };
    SceneInterface.defaultProps = {
        duration: 0,
        fillMode: 'forwards',
        direction: 'normal',
        playSpeed: 1,
        iterationCount: 1,
        delay: 0,
        easing: 0,
        time: -1,
        css: false,
        autoplay: false,
        onPlay: function () { return undefined; },
        onPaused: function () { return undefined; },
        onEnded: function () { return undefined; },
        onTimeUpdate: function () { return undefined; },
        onIteration: function () { return undefined; },
        onAnimate: function () { return undefined; },
    };
    return SceneInterface;
}(Component));
export { SceneInterface };
//# sourceMappingURL=SceneInterface.js.map