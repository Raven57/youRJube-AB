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
exports.HomePageComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
// We use the gql tag to parse our query string into a query document
var homeQuery = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery home(\n  $restr: ID,\n  $loc:ID,\n  $type:ID,\n  $cond:ID,){\n  homevideos(filter:{\n    restrictionid:$restr,\n    locationid:$loc,\n    typeid:$type,\n    videoconditionid:$cond}){\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      videoid,\n      typeid,\n      user{userid,\n        username,\n      }\n  }\n}"], ["\nquery home(\n  $restr: ID,\n  $loc:ID,\n  $type:ID,\n  $cond:ID,){\n  homevideos(filter:{\n    restrictionid:$restr,\n    locationid:$loc,\n    typeid:$type,\n    videoconditionid:$cond}){\n      videotitle,\n      publishtime,\n      thumbnailsource,\n      viewcount,\n      length,\n      videoid,\n      typeid,\n      user{userid,\n        username,\n      }\n  }\n}"])));
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(apollo, userService, loc, premium, restrict) {
        this.apollo = apollo;
        this.userService = userService;
        this.loc = loc;
        this.premium = premium;
        this.restrict = restrict;
        this.check = 0;
        this.last = 12;
    }
    HomePageComponent.prototype.prints = function () {
        console.log('ini userid', this.userid);
    };
    HomePageComponent.prototype.ngOnDestroy = function () {
        // this.querySubscription.unsubscribe();
    };
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loc.currLocID.subscribe(function (loc) {
            _this.locid = loc;
            _this.checkForQuery(_this.locid, 1);
        });
        this.premium.currPremiumId.subscribe(function (premid) {
            _this.premid = premid;
            _this.checkForQuery(_this.premid, 2);
        });
        this.restrict.currRestrictionID.subscribe(function (r) {
            _this.restid = r;
            _this.checkForQuery(_this.restid, 3);
        });
        this.userService.currUserID.subscribe(function (user) {
            _this.userid = user;
            // this.checkForQuery(this.userid, 4);
        });
    };
    HomePageComponent.prototype.homeQuery = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: homeQuery,
            variables: {
                restr: this.restid,
                loc: this.locid,
                type: this.premid,
                cond: this.premid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            _this.videos = data.homevideos;
            _this.obs = new IntersectionObserver(function (entry) {
                if (entry[0].isIntersecting) {
                    var main = document.querySelector(".content");
                    for (var i = 0; i < 4; i++) {
                        if (_this.last < _this.videos.length) {
                            var div = document.createElement("div");
                            var app = document.createElement("app-video-card");
                            app.setAttribute("channel", "this.videos[last].user.username");
                            app.setAttribute("img", "this.videos[last].thumbnailsource");
                            app.setAttribute("length", "this.videos[last].length");
                            app.setAttribute("title", "this.videos[last].videotitle");
                            app.setAttribute("publish", "this.videos[last].publishtime");
                            app.setAttribute("view", "this.videos[last].viewcount");
                            div.appendChild(app);
                            main.appendChild(div);
                            _this.last++;
                        }
                    }
                }
            });
            _this.obs.observe(document.querySelector(".foot"));
            console.log('this videos', _this.videos);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    HomePageComponent.prototype.checkForQuery = function (inp, inc) {
        if (inp != null) {
            this.check++;
            console.log('cek home', inc, this.check);
        }
        if (this.check >= 3 || (this.locid !== null && this.premid === null)) {
            this.homeQuery();
        }
    };
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'app-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.scss']
        })
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
var templateObject_1;
