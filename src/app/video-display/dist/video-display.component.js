"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VideoDisplayComponent = void 0;
var core_1 = require("@angular/core");
var VideoDisplayComponent = /** @class */ (function () {
    function VideoDisplayComponent(video, pl, user) {
        this.video = video;
        this.pl = pl;
        this.user = user;
        this.toggleSetting = false;
    }
    VideoDisplayComponent.prototype.togglePlaylist = function (bool) {
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
    VideoDisplayComponent.prototype.addQueue = function () {
        this.video.addQueue(this.videoid);
        if (this.toggleSetting) {
            this.toggleSetting = !this.toggleSetting;
        }
    };
    VideoDisplayComponent.prototype.checkVideoInPlaylist = function () {
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
    VideoDisplayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.publish = this.video.getDateDiffString(this.publish);
        this.user.currUserID.subscribe(function (u) { return _this.useridd = u; });
    };
    VideoDisplayComponent.prototype.toggleSettingfunc = function () {
        this.toggleSetting = !this.toggleSetting;
    };
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "typeid");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "userid");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "videoid");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "img");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "view");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "length");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "publish");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "channel");
    __decorate([
        core_1.Input()
    ], VideoDisplayComponent.prototype, "desc");
    VideoDisplayComponent = __decorate([
        core_1.Component({
            selector: 'app-video-display',
            templateUrl: './video-display.component.html',
            styleUrls: ['./video-display.component.scss']
        })
    ], VideoDisplayComponent);
    return VideoDisplayComponent;
}());
exports.VideoDisplayComponent = VideoDisplayComponent;
