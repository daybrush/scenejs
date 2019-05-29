"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scenejs_1 = require("scenejs");
var ng_scene_item_component_1 = require("./ng-scene-item.component");
var ng_scene_interface_1 = require("./ng-scene.interface");
var NgSceneComponent = /*#__PURE__*/ (function (_super) {
    __extends(NgSceneComponent, _super);
    function NgSceneComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgSceneComponent.prototype.ngAfterViewInit = function () {
        this.item = new scenejs_1.default();
        var scene = this.item;
        this._items.forEach(function (ngItem) {
            var item = ngItem.getItem();
            var id = item.getId();
            scene.setItem(id, item);
        });
        this.init();
    };
    __decorate([
        core_1.ContentChildren(ng_scene_item_component_1.NgSceneItemComponent),
        __metadata("design:type", core_1.QueryList)
    ], NgSceneComponent.prototype, "_items", void 0);
    NgSceneComponent = __decorate([
        core_1.Component({
            selector: 'ng-scene',
            template: '<ng-content></ng-content>'
        })
    ], NgSceneComponent);
    return NgSceneComponent;
}(ng_scene_interface_1.NgSceneInterface));
exports.NgSceneComponent = NgSceneComponent;
//# sourceMappingURL=ng-scene.component.js.map