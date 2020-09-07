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
exports.PlaylistService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var createPlaylist = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation createPlaylist(\n  $usid:ID!,\n  $pltitle:String!,\n  $pldesc:String!,\n  $privid:ID!) {\n  createPlaylist(input:{\n    playlisttitle:$pltitle,\n    playlistdescription:$pldesc,\n\t\tuserid:$usid,\n    privacyid:$privid\n  }){\n    playlistid\n  }\n}\n"], ["\nmutation createPlaylist(\n  $usid:ID!,\n  $pltitle:String!,\n  $pldesc:String!,\n  $privid:ID!) {\n  createPlaylist(input:{\n    playlisttitle:$pltitle,\n    playlistdescription:$pldesc,\n\t\tuserid:$usid,\n    privacyid:$privid\n  }){\n    playlistid\n  }\n}\n"])));
var addUserPlaylist = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation addUserPlaylist($userid:ID!, $playlistid:ID!) {\n  UserAddPlaylist(input:{userid:$userid,playlistid:$playlistid}){\n    playlistid\n  }\n}\n"], ["\nmutation addUserPlaylist($userid:ID!, $playlistid:ID!) {\n  UserAddPlaylist(input:{userid:$userid,playlistid:$playlistid}){\n    playlistid\n  }\n}\n"])));
var createPlaylistDetail = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation addPlaylistDetail($psid:ID!,$vidid:ID!){\n  createPlaylistDetail(input:{playlistid:$psid,videoid:$vidid}){\n    videoorder\n  }\n}\n"], ["\nmutation addPlaylistDetail($psid:ID!,$vidid:ID!){\n  createPlaylistDetail(input:{playlistid:$psid,videoid:$vidid}){\n    videoorder\n  }\n}\n"])));
var removeUserPlaylist = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation removeUserPlaylist($userid:ID!, $playlistid:ID!) {\n  UserRemovePlaylist(input:{userid:$userid,playlistid:$playlistid})\n}\n"], ["\nmutation removeUserPlaylist($userid:ID!, $playlistid:ID!) {\n  UserRemovePlaylist(input:{userid:$userid,playlistid:$playlistid})\n}\n"])));
var getPlaylist = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nquery userPlaylist($userid: ID!,$playlistid:ID){\n  getUserSavedPlaylist(userid:$userid,playlistid:$playlistid){\n    playlist{\n      playlisttitle\n      playlistid\n      privacyid\n      userid\n    }\n  }\n}\n"], ["\nquery userPlaylist($userid: ID!,$playlistid:ID){\n  getUserSavedPlaylist(userid:$userid,playlistid:$playlistid){\n    playlist{\n      playlisttitle\n      playlistid\n      privacyid\n      userid\n    }\n  }\n}\n"])));
var updatePlaylist = graphql_tag_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["\nmutation updatePlaylist(\n  $psid: ID!,\n  $title: String,\n  $desc: String,\n  $priv: ID,\n  $thumb: String,\n  $url: String,\n  $userid:ID\n){\n  updatePlaylist(input:{playlistid:$psid,\n                        playlisttitle:$title,\n                        userid:$userid,\n                        playlistdescription: $desc,\n                        privacyid: $priv,\n                        thumbnailsource: $thumb,\n                        playlisturl: $url\n                      }){\n    playlisttitle\n  }\n}\n"], ["\nmutation updatePlaylist(\n  $psid: ID!,\n  $title: String,\n  $desc: String,\n  $priv: ID,\n  $thumb: String,\n  $url: String,\n  $userid:ID\n){\n  updatePlaylist(input:{playlistid:$psid,\n                        playlisttitle:$title,\n                        userid:$userid,\n                        playlistdescription: $desc,\n                        privacyid: $priv,\n                        thumbnailsource: $thumb,\n                        playlisturl: $url\n                      }){\n    playlisttitle\n  }\n}\n"])));
var updateDetail = graphql_tag_1["default"](templateObject_7 || (templateObject_7 = __makeTemplateObject(["\nmutation updatePlaylist(\n  $psid: ID!,\n  $vidid: ID!,\n  $mov: String,\n  $view: Boolean\n){\n  updatePlaylistDetail(input:{\n    playlistid:$psid,\n    videoid:$vidid,\n    view:$view,\n    move:$mov}){\n    videoorder\n  }\n}\n"], ["\nmutation updatePlaylist(\n  $psid: ID!,\n  $vidid: ID!,\n  $mov: String,\n  $view: Boolean\n){\n  updatePlaylistDetail(input:{\n    playlistid:$psid,\n    videoid:$vidid,\n    view:$view,\n    move:$mov}){\n    videoorder\n  }\n}\n"])));
var deleteDetail = graphql_tag_1["default"](templateObject_8 || (templateObject_8 = __makeTemplateObject(["\nmutation deleteDetail($playlistid:ID!, $videoid:ID){\n  deletePlaylistDetail(playlistid:$playlistid, videoid:$videoid)\n}\n"], ["\nmutation deleteDetail($playlistid:ID!, $videoid:ID){\n  deletePlaylistDetail(playlistid:$playlistid, videoid:$videoid)\n}\n"])));
var getOwnPlaylist = graphql_tag_1["default"](templateObject_9 || (templateObject_9 = __makeTemplateObject(["\nquery playlists($userid:ID!){\n  getUserPlaylist(userid:$userid){\n    playlistid,\n    playlisttitle,\n    privacyid,\n    playlistdetails{\n      videoid\n    }\n  }\n}"], ["\nquery playlists($userid:ID!){\n  getUserPlaylist(userid:$userid){\n    playlistid,\n    playlisttitle,\n    privacyid,\n    playlistdetails{\n      videoid\n    }\n  }\n}"])));
var details = graphql_tag_1["default"](templateObject_10 || (templateObject_10 = __makeTemplateObject(["\nquery details($plid:ID!){\n  playlistdetails(playlistid:$plid){\n    videoorder,\n    video{\n      videotitle,\n      length,\n      thumbnailsource,\n      user {\n        username\n      }\n    }\n  }\n}\n"], ["\nquery details($plid:ID!){\n  playlistdetails(playlistid:$plid){\n    videoorder,\n    video{\n      videotitle,\n      length,\n      thumbnailsource,\n      user {\n        username\n      }\n    }\n  }\n}\n"])));
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var PlaylistService = /** @class */ (function () {
    function PlaylistService(apollo) {
        this.apollo = apollo;
        this.PlaylistSource = new rxjs_1.BehaviorSubject(null);
        this.currPlaylist = this.PlaylistSource.asObservable();
        this.OwnPlaylistSource = new rxjs_1.BehaviorSubject(null);
        this.currOwnPlaylist = this.OwnPlaylistSource.asObservable();
        this.OwnFixedSource = new rxjs_1.BehaviorSubject(null);
        this.currFixedPlaylist = this.OwnFixedSource.asObservable();
        this.activePlaylistSource = new rxjs_1.BehaviorSubject(null);
        this.currActivePlaylist = this.activePlaylistSource.asObservable();
        this.check = 0;
    }
    PlaylistService.prototype.changePlaylist = function (item) {
        this.PlaylistSource.next(item);
    };
    PlaylistService.prototype.changeOwnPlaylist = function (item) {
        this.OwnPlaylistSource.next(item);
    };
    PlaylistService.prototype.changeFixedPlaylist = function (item) {
        this.OwnFixedSource.next(item);
    };
    PlaylistService.prototype.playPlaylist = function (inOrder, pl) {
        var playlist;
        this.apollo.watchQuery({
            query: details,
            variables: {
                plid: pl
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('got data  ', data.playlistdetails);
            // this.changeOwnPlaylist(data.getUserPlaylist);
        }, function (error) {
            console.log(error);
        });
        if (inOrder) {
        }
        else {
        }
        this.activePlaylistSource.next(playlist);
    };
    PlaylistService.prototype.removePlaylist = function () {
        this.activePlaylistSource.next(null);
    };
    PlaylistService.prototype.checkSaved = function (playlistid) {
        console.log('pls id ', playlistid);
        var pls;
        this.currPlaylist.subscribe(function (p) {
            pls = p;
            pls.forEach(function (element) {
                console.log('element ', element.playlist.playlistid);
                if (element.playlist.playlistid == playlistid) {
                    return true;
                }
            });
        });
        return false;
    };
    PlaylistService.prototype.getOwnPlaylist = function (uid) {
        var _this = this;
        this.apollo.watchQuery({
            query: getOwnPlaylist,
            variables: {
                userid: uid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('got data  ', data);
            _this.changeOwnPlaylist(data.getUserPlaylist);
        }, function (error) {
            console.log(error);
        });
    };
    PlaylistService.prototype.getPlaylist = function (uid) {
        var _this = this;
        this.apollo.watchQuery({
            query: getPlaylist,
            variables: {
                userid: uid,
                playlistid: ''
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            var dats = _this.sortByPrivacyFunc(data.getUserSavedPlaylist);
            _this.changePlaylist(dats);
        }, function (error) {
            console.log(error);
        });
    };
    PlaylistService.prototype.sortByPrivacyFunc = function (input) {
        input = input.sort(function (s1, s2) {
            var string1;
            string1 = s1.playlist.privacyid;
            var string2;
            string2 = s2.playlist.privacyid;
            return (string2 - string1);
        });
        return input;
    };
    PlaylistService.prototype.addToUser = function (u, p) {
        this.apollo.mutate({
            mutation: addUserPlaylist,
            variables: {
                userid: u,
                playlistid: p
            },
            refetchQueries: [{
                    query: getOwnPlaylist,
                    variables: {
                        userid: u,
                        playlistid: ''
                    }
                }]
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
            //tadinya di sini
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    PlaylistService.prototype.checkData = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wait(5000)];
                    case 1:
                        _a.sent();
                        this.getPlaylist(uid);
                        return [2 /*return*/];
                }
            });
        });
    };
    PlaylistService.prototype.removeFromUser = function (u, p) {
        this.apollo.mutate({
            mutation: removeUserPlaylist,
            variables: {
                userid: u,
                playlistid: p
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    PlaylistService.prototype.createPlay = function (u, tit, desc, priv) {
        var _this = this;
        console.log(u);
        console.log(tit);
        console.log(desc);
        console.log(priv);
        this.apollo.mutate({
            mutation: createPlaylist,
            variables: {
                usid: u,
                pltitle: tit,
                pldesc: desc,
                privid: priv
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data data data', data);
            _this.addToUser(u, data.createPlaylist.playlistid);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    PlaylistService.prototype.updatePlaylist = function (u, p, tit, des, pri, th, ur) {
        this.apollo.mutate({
            mutation: updatePlaylist,
            variables: {
                psid: p,
                title: tit,
                desc: des,
                priv: pri,
                thumb: th,
                url: ur,
                userid: u
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    PlaylistService.prototype.updateDetail = function (u, p, mo, v) {
        this.apollo.mutate({
            mutation: updateDetail,
            variables: {
                psid: p,
                vidid: u,
                mov: mo,
                view: v
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    PlaylistService.prototype.deletePlaylistDetail = function (psid, videoi) {
        this.apollo.mutate({
            mutation: deleteDetail,
            variables: {
                playlistid: psid,
                videoid: videoi
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    PlaylistService.prototype.createDetail = function (u, p) {
        this.apollo.mutate({
            mutation: createPlaylistDetail,
            variables: {
                psid: p,
                vidid: u
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    PlaylistService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
