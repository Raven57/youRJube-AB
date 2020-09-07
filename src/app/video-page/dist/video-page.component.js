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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.VideoPageComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var checkSubscribe = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery checkSub($user:ID!,\n  $channel:ID!){\n  checkSubscribe(input:{userid:$user, channelid:$channel}){\n    userid,channelid,notification\n  }\n}\n"], ["\nquery checkSub($user:ID!,\n  $channel:ID!){\n  checkSubscribe(input:{userid:$user, channelid:$channel}){\n    userid,channelid,notification\n  }\n}\n"])));
var fullVideo = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery Allvids($videoid:ID!,$userid:ID){\n  getFullVideoInfo(videoid:$videoid,userid:$userid){\n    video{\n      typeid,\n      videoid,\n      videotitle,\n      videodescription,\n      thumbnailsource,\n      privacyid,\n      videosource,\n      publishtime,\n      viewcount,\n      category{\n        categoryname\n      }\n    },\n    like,\n    dislike,\n    fullUser{\n      user{\n        userid\n        profileimgaddr\n        username\n      },count,videoCount},\n    fullComment{\n      comment{\n        commentdetail, commenttime, rootcommentid,\n        user{\n          username,\n          profileimgaddr,\n          userid\n        }\n      }\n      like,\n      dislike\n    }\n  }\n}\n"], ["\nquery Allvids($videoid:ID!,$userid:ID){\n  getFullVideoInfo(videoid:$videoid,userid:$userid){\n    video{\n      typeid,\n      videoid,\n      videotitle,\n      videodescription,\n      thumbnailsource,\n      privacyid,\n      videosource,\n      publishtime,\n      viewcount,\n      category{\n        categoryname\n      }\n    },\n    like,\n    dislike,\n    fullUser{\n      user{\n        userid\n        profileimgaddr\n        username\n      },count,videoCount},\n    fullComment{\n      comment{\n        commentdetail, commenttime, rootcommentid,\n        user{\n          username,\n          profileimgaddr,\n          userid\n        }\n      }\n      like,\n      dislike\n    }\n  }\n}\n"])));
var q = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nquery queue($videoid:[ID!]!){\n  getQueueInfo(videoid:$videoid){\n    videotitle,thumbnailsource,length,user{\n      username\n    }\n  }\n}\n\n"], ["\nquery queue($videoid:[ID!]!){\n  getQueueInfo(videoid:$videoid){\n    videotitle,thumbnailsource,length,user{\n      username\n    }\n  }\n}\n\n"])));
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var VideoPageComponent = /** @class */ (function () {
    function VideoPageComponent(route, apollo, router, userService, premiums, vid) {
        this.route = route;
        this.apollo = apollo;
        this.router = router;
        this.userService = userService;
        this.premiums = premiums;
        this.vid = vid;
        // @ViewChild('video') matVideo: MatVideoComponent;
        // video: HTMLVideoElement;
        // videos: any[];
        // last = 10;
        this.id = '';
        this.userid = '';
        this.like = 0;
        this.dislike = 0;
        this.subscribed = false;
        this.notif = false;
        this.premium = false;
        this.ownChannel = false;
        this.premid = '';
    }
    VideoPageComponent.prototype.removeQ = function () {
        this.vid.removeQueue();
    };
    VideoPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.vid.currQueue.subscribe(function (q) {
            _this.queue = q;
            if (_this.queue !== null) {
                _this.queryQueue();
            }
        });
        this.route.paramMap.subscribe(function (params) {
            // this.category = cats[+params.get('categoryid')];
            // this.vid.getQueue();
            console.log(+params.get('videoid'));
            _this.id = params.get('videoid');
            _this.userService.currUser.subscribe(function (user) {
                _this.user = user;
            });
            _this.userService.currUserID.subscribe(function (user) {
                _this.userid = user;
                _this.query(_this.userid);
            });
            _this.premiums.currPremiumId.subscribe(function (premid) {
                _this.premid = premid;
            });
        });
    };
    VideoPageComponent.prototype.queryQueue = function () {
        var _this = this;
        var vididArr = [];
        this.queue.forEach(function (q) {
            vididArr.push(q.videoid);
        });
        this.apollo.watchQuery({
            query: q,
            variables: {
                videoid: vididArr
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('dataaaaa ', data);
            var temp = data.getQueueInfo;
            for (var i = 0; i < _this.queue.length; i++) {
                _this.queue[i].videotitle = temp[i].videotitle;
                _this.queue[i].length = temp[i].length;
                _this.queue[i].thumbnailsource = temp[i].thumbnailsource;
                _this.queue[i].username = temp[i].user.username;
            }
        }, function (error) {
            console.log('error', error);
        });
    };
    // checkQuery(inp: any) {
    //   if (inp != null) {
    //     this.query();
    //   }
    // }
    VideoPageComponent.prototype.query = function (str) {
        var _this = this;
        console.log(this.userid);
        console.log(this.id);
        this.apollo.watchQuery({
            query: fullVideo,
            variables: {
                videoid: this.id,
                userid: str
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('VIDEOOO ', data);
            _this.v = data.getFullVideoInfo.video;
            _this.u = data.getFullVideoInfo.fullUser;
            _this.queryCheck();
            _this.like = data.getFullVideoInfo.like;
            _this.dislike = data.getFullVideoInfo.dislike;
            _this.comments = data.getFullVideoInfo.fullComment.comment;
            var likes = data.getFullVideoInfo.fullComment.like;
            var dislike = data.getFullVideoInfo.fullComment.dislike;
            _this.v.publishtime = _this.vid.getDateDiffString(_this.v.publishtime);
            for (var i = 0; i < _this.comments.length; i++) {
                _this.comments[i].like = likes[i];
                _this.comments[i].dislike = dislike[i];
            }
            if (_this.v.typeid === '2') {
                _this.premium = true;
                if (_this.premid == null) {
                    alert('LOGIN TO SEE THIS VIDEO!');
                    window.location.assign('/home');
                }
                else if (_this.premid === '1') {
                    alert('BECOME A PREMIUM MEMBER TO SEE THIS VIDEO!');
                    window.location.assign('/home');
                }
            }
        }, function (error) {
            console.log('error', error);
        });
    };
    VideoPageComponent.prototype.go = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.v = [];
                        return [4 /*yield*/, wait(500)];
                    case 1:
                        _a.sent();
                        this.router.navigate([link]);
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoPageComponent.prototype.queryCheck = function () {
        var _this = this;
        console.log('useridd  ', this.userid);
        this.apollo.watchQuery({
            query: checkSubscribe,
            variables: {
                user: this.userid,
                channel: this.u.user.userid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            console.log('SUBSCRIBED', data.checkSubscribe);
            if (data != null) {
                _this.subscribed = data.checkSubscribe;
                _this.notif = data.checkSubscribe.notification;
            }
        });
        if (this.u.user.userid === this.userid) {
            this.ownChannel = true;
            console.log('ownChannel', this.ownChannel);
        }
    };
    VideoPageComponent = __decorate([
        core_1.Component({
            selector: 'app-video-page',
            templateUrl: './video-page.component.html',
            styleUrls: ['./video-page.component.scss']
        })
    ], VideoPageComponent);
    return VideoPageComponent;
}());
exports.VideoPageComponent = VideoPageComponent;
var templateObject_1, templateObject_2, templateObject_3;
