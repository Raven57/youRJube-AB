"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VideoCardComponent = void 0;
var core_1 = require("@angular/core");
var VideoCardComponent = /** @class */ (function () {
    function VideoCardComponent(pl, video, user) {
        this.pl = pl;
        this.video = video;
        this.user = user;
        this.toggleSetting = false;
    }
    VideoCardComponent.prototype.togglePlaylist = function (bool) {
        var _this = this;
        if (this.useridd == null) {
            alert('PLEASE LOGIN TO ADD TO PLAYLIST');
        }
        else {
            this.plvisible = bool;
            this.pl.currOwnPlaylist.subscribe(function (p) {
                _this.temp = p;
                _this.checkVideoInPlaylist();
                _this.pls = _this.temp;
                _this.pl.changeFixedPlaylist(_this.pls);
            });
        }
        if (this.toggleSetting) {
            this.toggleSetting = !this.toggleSetting;
        }
    };
    VideoCardComponent.prototype.addQueue = function () {
        this.video.addQueue(this.videoid);
        if (this.toggleSetting) {
            this.toggleSetting = !this.toggleSetting;
        }
    };
    VideoCardComponent.prototype.checkVideoInPlaylist = function () {
        var _this = this;
        this.temp.forEach(function (p) {
            p.playlistdetails.forEach(function (pd) {
                if (pd.videoid === _this.videoid) {
                    p.available = true;
                }
                else {
                    p.available = false;
                }
            });
        });
    };
    VideoCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user.currUserID.subscribe(function (u) { return _this.useridd = u; });
        this.publish = this.video.getDateDiffString(this.publish);
    };
    VideoCardComponent.prototype.toggleSettingfunc = function () {
        this.toggleSetting = !this.toggleSetting;
    };
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "typeid");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "userid");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "videoid");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "img");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "view");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "length");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "publish");
    __decorate([
        core_1.Input()
    ], VideoCardComponent.prototype, "channel");
    VideoCardComponent = __decorate([
        core_1.Component({
            selector: 'app-video-card',
            templateUrl: './video-card.component.html',
            styleUrls: ['./video-card.component.scss']
        })
    ], VideoCardComponent);
    return VideoCardComponent;
}());
exports.VideoCardComponent = VideoCardComponent;
