"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaylistItemComponent = void 0;
var core_1 = require("@angular/core");
var PlaylistItemComponent = /** @class */ (function () {
    function PlaylistItemComponent(pl) {
        this.pl = pl;
    }
    PlaylistItemComponent.prototype.ngOnInit = function () {
    };
    PlaylistItemComponent.prototype.playAll = function () {
        this.pl.playPlaylist(true, this.playlistid);
    };
    __decorate([
        core_1.Input()
    ], PlaylistItemComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], PlaylistItemComponent.prototype, "playlistid");
    __decorate([
        core_1.Input()
    ], PlaylistItemComponent.prototype, "img");
    __decorate([
        core_1.Input()
    ], PlaylistItemComponent.prototype, "channel");
    __decorate([
        core_1.Input()
    ], PlaylistItemComponent.prototype, "description");
    __decorate([
        core_1.Input()
    ], PlaylistItemComponent.prototype, "videoCount");
    PlaylistItemComponent = __decorate([
        core_1.Component({
            selector: 'app-playlist-item',
            templateUrl: './playlist-item.component.html',
            styleUrls: ['./playlist-item.component.scss']
        })
    ], PlaylistItemComponent);
    return PlaylistItemComponent;
}());
exports.PlaylistItemComponent = PlaylistItemComponent;
