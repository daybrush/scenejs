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
import { Component, ContentChildren, QueryList } from '@angular/core';
import Scene from 'scenejs';
import { NgSceneItemComponent } from './ng-scene-item.component';
import { NgSceneInterface } from './ng-scene.interface';
var NgSceneComponent = /*#__PURE__*/ (function (_super) {
    __extends(NgSceneComponent, _super);
    function NgSceneComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgSceneComponent.prototype.ngAfterViewInit = function () {
        this.item = new Scene();
        var scene = this.item;
        this._items.forEach(function (ngItem) {
            var item = ngItem.getItem();
            var id = item.getId();
            scene.setItem(id, item);
        });
        this.init();
    };
    __decorate([
        ContentChildren(NgSceneItemComponent),
        __metadata("design:type", QueryList)
    ], NgSceneComponent.prototype, "_items", void 0);
    NgSceneComponent = __decorate([
        Component({
            selector: 'ng-scene',
            template: '<ng-content></ng-content>'
        })
    ], NgSceneComponent);
    return NgSceneComponent;
}(NgSceneInterface));
export { NgSceneComponent };
//# sourceMappingURL=ng-scene.component.js.map