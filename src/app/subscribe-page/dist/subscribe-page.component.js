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
exports.SubscribePageComponent = void 0;
var graphql_tag_1 = require("graphql-tag");
var core_1 = require("@angular/core");
var getSubscribed = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery subbed($userid: ID!){\n  getUserSubscribedtoID(userid:$userid)\n}\n"], ["\nquery subbed($userid: ID!){\n  getUserSubscribedtoID(userid:$userid)\n}\n"])));
var querySubbedVideo = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery videoSub($channelid: [String!]!){\n  getSubscribedVideo(channelid:$channelid){\n    today{\n      videoid,\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      typeid,\n      user{\n      userid,\n      profileimgaddr,\n      username\n      }\n    }\n    week{\n      videoid,\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      typeid,\n      user{\n      userid,\n      profileimgaddr,\n      username\n      }\n    }\n    month{\n      videoid,\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      typeid,\n      user{\n      userid,\n      profileimgaddr,\n      username\n      }\n    }\n  }\n}\n"], ["\nquery videoSub($channelid: [String!]!){\n  getSubscribedVideo(channelid:$channelid){\n    today{\n      videoid,\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      typeid,\n      user{\n      userid,\n      profileimgaddr,\n      username\n      }\n    }\n    week{\n      videoid,\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      typeid,\n      user{\n      userid,\n      profileimgaddr,\n      username\n      }\n    }\n    month{\n      videoid,\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      typeid,\n      user{\n      userid,\n      profileimgaddr,\n      username\n      }\n    }\n  }\n}\n"])));
var SubscribePageComponent = /** @class */ (function () {
    function SubscribePageComponent(apollo, router, userService, premium) {
        this.apollo = apollo;
        this.router = router;
        this.userService = userService;
        this.premium = premium;
        this.logged = false;
        this.count = 0;
        this.last = 100;
    }
    SubscribePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currUserID.subscribe(function (user) {
            _this.userid = user;
            _this.checkQuery(_this.userid);
        });
        this.userService.currUser.subscribe(function (usera) {
            _this.user = usera;
            _this.checkQuery(_this.user);
        });
        this.premium.currPremiumId.subscribe(function (p) {
            _this.premid = p;
            _this.checkQuery(_this.premid);
        });
    };
    SubscribePageComponent.prototype.checkQuery = function (inp) {
        if (inp != null) {
            this.count++;
        }
        else {
            this.count--;
        }
        console.log('count sub page ', this.count);
        if (this.count < -1) {
            alert('PLEASE LOGIN FIRST!');
            this.router.navigateByUrl('/');
        }
        if (this.count > 1) {
            this.queryid();
        }
    };
    SubscribePageComponent.prototype.queryid = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: getSubscribed,
            variables: {
                userid: this.userid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('got data channelid', data);
            _this.channelid = data.getUserSubscribedtoID;
            _this.queryvids();
            // console.log(this.channelid);
        }, function (error) {
            console.log(error);
        });
    };
    SubscribePageComponent.prototype.queryvids = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: querySubbedVideo,
            variables: {
                channelid: this.channelid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('got dataaaa ', data);
            _this.today = data.getSubscribedVideo.today;
            _this.today = _this.checkType(_this.today);
            _this.week = data.getSubscribedVideo.week;
            _this.week = _this.checkType(_this.week);
            _this.month = data.getSubscribedVideo.month;
            _this.month = _this.checkType(_this.month);
        }, function (error) {
            console.log(error);
        });
    };
    SubscribePageComponent.prototype.checkType = function (input) {
        if (this.premid == null || this.premid == '1') {
            input = input.filter(function (i) { return i.typeid !== '2'; });
        }
        return input;
    };
    SubscribePageComponent = __decorate([
        core_1.Component({
            selector: 'app-subscribe-page',
            templateUrl: './subscribe-page.component.html',
            styleUrls: ['./subscribe-page.component.scss']
        })
    ], SubscribePageComponent);
    return SubscribePageComponent;
}());
exports.SubscribePageComponent = SubscribePageComponent;
var templateObject_1, templateObject_2;
