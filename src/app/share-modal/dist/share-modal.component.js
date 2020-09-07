"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareModalComponent = void 0;
var core_1 = require("@angular/core");
var ShareModalComponent = /** @class */ (function () {
    function ShareModalComponent(router) {
        this.router = router;
        this.changeVisible = new core_1.EventEmitter();
    }
    ShareModalComponent.prototype.ngOnInit = function () {
        // this.userService.checkUser();
        this.url = this.router.url;
    };
    ShareModalComponent.prototype.close = function () {
        this.changeVisible.emit(false);
    };
    ShareModalComponent.prototype.copy = function () {
        return 'https://tpa-webab.web.app' + this.url;
    };
    __decorate([
        core_1.Input()
    ], ShareModalComponent.prototype, "isVisible");
    __decorate([
        core_1.Output()
    ], ShareModalComponent.prototype, "changeVisible");
    ShareModalComponent = __decorate([
        core_1.Component({
            selector: 'app-share-modal',
            templateUrl: './share-modal.component.html',
            styleUrls: ['./share-modal.component.scss']
        })
    ], ShareModalComponent);
    return ShareModalComponent;
}());
exports.ShareModalComponent = ShareModalComponent;
