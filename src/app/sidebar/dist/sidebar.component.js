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
exports.SidebarComponent = void 0;
var graphql_tag_1 = require("graphql-tag");
var core_1 = require("@angular/core");
var getAll = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery categories{\n  categories{\n    categoryid,\n    categoryname\n  }\n}"], ["\nquery categories{\n  categories{\n    categoryid,\n    categoryname\n  }\n}"])));
var getSubscribed = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery subbed($userid: ID!){\n  getUserSubscribedto(userid:$userid){\n    channel{\n      userid,\n      profileimgaddr,\n      username\n    }\n  }\n}\n"], ["\nquery subbed($userid: ID!){\n  getUserSubscribedto(userid:$userid){\n    channel{\n      userid,\n      profileimgaddr,\n      username\n    }\n  }\n}\n"])));
var getPlaylist = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nquery playlists($userid: ID!){\n  getUserPlaylist(userid:$userid){\n    playlisttitle\n    playlistid\n  }\n}\n"], ["\nquery playlists($userid: ID!){\n  getUserPlaylist(userid:$userid){\n    playlisttitle\n    playlistid\n  }\n}\n"])));
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(ip, userService, playlist, apollo, sub) {
        this.ip = ip;
        this.userService = userService;
        this.playlist = playlist;
        this.apollo = apollo;
        this.sub = sub;
        this.modalVisible = false;
        this.toggleMenu = false;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currUserID.subscribe(function (user) {
            _this.userid = user;
            if (_this.userid != null) {
                console.log('masuk query');
                _this.playlist.getPlaylist(_this.userid);
                _this.getSubscribed();
                _this.playlist.getOwnPlaylist(_this.userid);
                _this.sub.currSubscribedTo.subscribe(function (subbed) { return _this.subscribed = subbed; });
            }
        });
        this.playlist.currPlaylist.subscribe(function (p) { return _this.playlists = p; });
        // this.getCategories();
        this.ip.getCountry();
        // this.userService.checkUser();
        this.userService.currUser.subscribe(function (user) { return _this.user = user; });
    };
    SidebarComponent.prototype.togglePlaylist = function () {
        console.log(this.playlistToggle);
        this.playlistToggle = !this.playlistToggle;
    };
    SidebarComponent.prototype.toggleSub = function () {
        console.log(this.subbedToggle);
        this.subbedToggle = !this.subbedToggle;
    };
    SidebarComponent.prototype.toggleModal = function (bool) {
        this.modalVisible = bool;
    };
    SidebarComponent.prototype.toggleFunc = function (bool) {
        this.toggleMenu = bool;
    };
    SidebarComponent.prototype.getSubscribed = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: getSubscribed,
            variables: {
                userid: this.userid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('got data ', data);
            _this.subscribed = data.getUserSubscribedto;
            _this.subscribed = _this.subscribed.sort(function (s1, s2) {
                var string1;
                string1 = s1.channel.username;
                var string2;
                string2 = s2.channel.username;
                return string1.localeCompare(string2);
            });
            _this.sub.changeSubscribedTo(_this.subscribed);
        }, function (error) {
            console.log(error);
        });
    };
    // getPlaylists() {
    //   this.apollo.watchQuery<any>({
    //     query: getPlaylist,
    //     variables: {
    //       userid: this.userid
    //     }
    //   }).valueChanges.subscribe(({ data }) => {
    //     console.log('got data  ', data);
    //     this.playlist.changePlaylist(data.getUserPlaylist);
    //     this.playlist.currPlaylist.subscribe(p => this.playlists = p);
    //     console.log('asdsaasd', this.playlists);
    //   }, (error) => {
    //     console.log(error);
    //   });
    // }
    SidebarComponent.prototype.getCategories = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: getAll
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            _this.categories = data.categories;
            console.log('got data', _this.categories);
        }, function (error) {
            console.log(error);
        });
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
var templateObject_1, templateObject_2, templateObject_3;
