var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { SceneItem } from 'scenejs';
import { NgSceneInterface } from './ng-scene.interface';
var NgSceneItemComponent = /*#__PURE__*/ (function (_super) {
    __extends(NgSceneItemComponent, _super);
    function NgSceneItemComponent(_element) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        return _this;
    }
    NgSceneItemComponent.ctorParameters = function () {
        return [{ type: ElementRef }];
    };
    NgSceneItemComponent.prototype.ngOnInit = function () {
        this.item = new SceneItem();
        var item = this.item;
        if (this.keyframes) {
            item.set(this.keyframes);
        }
        else {
            item.set('0%', this.from);
            item.set('100%', this.to);
        }
        var element = this._element.nativeElement;
        item.setElement(element.nodeName === 'NG-SCENE-ITEM' ? element.children : element);
        this.init();
    };
    NgSceneItemComponent = __decorate([
        Component({
            selector: '[ng-scene-item], ng-scene-item',
            template: '<ng-content></ng-content>',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], NgSceneItemComponent);
    return NgSceneItemComponent;
}(NgSceneInterface));
export { NgSceneItemComponent };
//# sourceMappingURL=ng-scene-item.component.js.map