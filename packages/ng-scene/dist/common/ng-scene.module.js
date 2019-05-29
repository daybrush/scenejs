"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_scene_component_1 = require("./ng-scene.component");
var ng_scene_item_component_1 = require("./ng-scene-item.component");
var NgSceneModule = /*#__PURE__*/ (function () {
    function NgSceneModule() {
    }
    NgSceneModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            providers: [],
            declarations: [
                ng_scene_component_1.NgSceneComponent,
                ng_scene_item_component_1.NgSceneItemComponent,
            ],
            exports: [
                ng_scene_component_1.NgSceneComponent,
                ng_scene_item_component_1.NgSceneItemComponent
            ],
        })
    ], NgSceneModule);
    return NgSceneModule;
}());
exports.NgSceneModule = NgSceneModule;
//# sourceMappingURL=ng-scene.module.js.map