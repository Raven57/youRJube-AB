"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaylistModalComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var getDetail = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery playlist($id:ID!){\n  playlist(playlistid:$id){\n    playlist{\n      playlists{\n        playlisttitle,\n        playlistdetails{\n          video{\n            videoid,\n          }\n        }\n      }\n    }\n  }\n}\n"], ["\nquery playlist($id:ID!){\n  playlist(playlistid:$id){\n    playlist{\n      playlists{\n        playlisttitle,\n        playlistdetails{\n          video{\n            videoid,\n          }\n        }\n      }\n    }\n  }\n}\n"])));
var PlaylistModalComponent = /** @class */ (function () {
    function PlaylistModalComponent(router, ps, userService, apollo) {
        this.router = router;
        this.ps = ps;
        this.userService = userService;
        this.apollo = apollo;
        this.changeVisible = new core_1.EventEmitter();
        this.typeid = '2';
        this.name = '';
        this.desc = '';
    }
    PlaylistModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.userService.checkUser();
        this.url = this.router.url;
        this.userService.currUserID.subscribe(function (u) {
            _this.userid = u;
        });
        this.ps.currFixedPlaylist.subscribe(function (fx) {
            _this.playlists = fx;
        });
    };
    PlaylistModalComponent.prototype.changeAvailability = function (plid) {
        var _this = this;
        this.playlists.forEach(function (p) {
            if (p.playlistid === plid) {
                if (p.available) {
                    _this.removeToPlay(plid);
                }
                else if (!p.available) {
                    _this.addToPlay(plid);
                }
                p.available = !p.available;
            }
        });
    };
    PlaylistModalComponent.prototype.createPlaylist = function (tit, desc, priv) {
        this.ps.createPlay(this.userid, tit, desc, priv);
        // this.ps.checkData(this.userid);
    };
    PlaylistModalComponent.prototype.addToPlay = function (psid) {
        this.ps.createDetail(this.videoid, psid);
    };
    PlaylistModalComponent.prototype.removeToPlay = function (psid) {
        this.ps.deletePlaylistDetail(psid, this.videoid);
    };
    PlaylistModalComponent.prototype.close = function () {
        this.changeVisible.emit(false);
    };
    __decorate([
        core_1.Input()
    ], PlaylistModalComponent.prototype, "isVisible");
    __decorate([
        core_1.Input()
    ], PlaylistModalComponent.prototype, "videoid");
    __decorate([
        core_1.Output()
    ], PlaylistModalComponent.prototype, "changeVisible");
    PlaylistModalComponent = __decorate([
        core_1.Component({
            selector: 'app-playlist-modal',
            templateUrl: './playlist-modal.component.html',
            styleUrls: ['./playlist-modal.component.scss']
        })
    ], PlaylistModalComponent);
    return PlaylistModalComponent;
}());
exports.PlaylistModalComponent = PlaylistModalComponent;
var templateObject_1;
