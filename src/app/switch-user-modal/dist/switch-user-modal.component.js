"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SwitchUserModalComponent = void 0;
var core_1 = require("@angular/core");
var SwitchUserModalComponent = /** @class */ (function () {
    function SwitchUserModalComponent(userService, popup) {
        this.userService = userService;
        this.popup = popup;
    }
    SwitchUserModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.userService.checkUser();
        this.userService.currUser.subscribe(function (user) { return _this.user = user; });
        this.popup.currVisibility.subscribe(function (isVisible) { return _this.isVisible = isVisible; });
    };
    SwitchUserModalComponent.prototype.close = function () {
        this.popup.changeVisibility(false);
    };
    SwitchUserModalComponent.prototype.signOut = function () {
        this.userService.signOut();
        window.location.reload();
    };
    SwitchUserModalComponent.prototype.reSignin = function () {
        this.signOut();
        //SIGN IN
        this.userService.userLogin(this.user, this.pw);
    };
    SwitchUserModalComponent.prototype.signInWithGoogle = function () {
        this.signOut();
        //signinwithgoogle
        this.user = this.userService.signInWithGoogle();
    };
    SwitchUserModalComponent.prototype.manageAccount = function () {
    };
    SwitchUserModalComponent = __decorate([
        core_1.Component({
            selector: 'app-switch-user-modal',
            templateUrl: './switch-user-modal.component.html',
            styleUrls: ['./switch-user-modal.component.scss']
        })
    ], SwitchUserModalComponent);
    return SwitchUserModalComponent;
}());
exports.SwitchUserModalComponent = SwitchUserModalComponent;
