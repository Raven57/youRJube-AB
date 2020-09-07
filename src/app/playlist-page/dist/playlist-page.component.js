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
exports.PlaylistPageComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var q = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery playlist($id:ID!){\n  playlist(playlistid:$id){\n    playlist{\n      videocount,\n      playlists{\n        playlisttitle,\n        playlistdescription,\n        updatedtime,\n        thumbnailsource,\n        privacyid,\n        userid,\n        playlistdetails{\n          viewcount,\n          videoorder,\n          dateadded,\n          video{\n            videoid,\n            videotitle,\n            videodescription,\n            thumbnailsource,\n            viewcount,\n            videoconditionid,\n            restrictionid,\n            typeid,\n            publishtime,\n            user{\n              userid,\n              username\n            }\n          }\n        }\n      }\n    },\n    user{\n      user{\n        username,\n        profileimgaddr,\n        userid,\n        profileimgaddr,\n      },\n      count,videoCount\n    }\n  }\n}\n"], ["\nquery playlist($id:ID!){\n  playlist(playlistid:$id){\n    playlist{\n      videocount,\n      playlists{\n        playlisttitle,\n        playlistdescription,\n        updatedtime,\n        thumbnailsource,\n        privacyid,\n        userid,\n        playlistdetails{\n          viewcount,\n          videoorder,\n          dateadded,\n          video{\n            videoid,\n            videotitle,\n            videodescription,\n            thumbnailsource,\n            viewcount,\n            videoconditionid,\n            restrictionid,\n            typeid,\n            publishtime,\n            user{\n              userid,\n              username\n            }\n          }\n        }\n      }\n    },\n    user{\n      user{\n        username,\n        profileimgaddr,\n        userid,\n        profileimgaddr,\n      },\n      count,videoCount\n    }\n  }\n}\n"])));
var getUserPlaylist = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery userPlaylist($userid: ID!,$playlistid:ID){\n  getUserSavedPlaylist(userid:$userid,playlistid:$playlistid){\n    user{\n      userid,\n      username\n    }\n  }\n}\n"], ["\nquery userPlaylist($userid: ID!,$playlistid:ID){\n  getUserSavedPlaylist(userid:$userid,playlistid:$playlistid){\n    user{\n      userid,\n      username\n    }\n  }\n}\n"])));
var PlaylistPageComponent = /** @class */ (function () {
    function PlaylistPageComponent(route, apollo, vid, router, userService, pl, premium) {
        this.route = route;
        this.apollo = apollo;
        this.vid = vid;
        this.router = router;
        this.userService = userService;
        this.pl = pl;
        this.premium = premium;
        this.subcount = '';
        this.sortDateAdded = false;
        this.sortPopular = false;
        this.sortDatePublished = false;
        this.totalViewCount = 0;
        this.editTitle = false;
        this.editPriv = false;
        this.editDesc = false;
        this.isPrivate = false;
        this.shareVisible = false;
        this.popupVisible = false;
    }
    PlaylistPageComponent.prototype.showPopup = function () {
        this.popupVisible = !this.popupVisible;
    };
    PlaylistPageComponent.prototype.deleteVid = function (v) {
        this.pl.deletePlaylistDetail(this.playlistid, v);
        this.videos = this.videos.filter(function (vid) { return vid.video.videoid !== v; });
    };
    PlaylistPageComponent.prototype.removeFromUser = function (str, bool) {
        var _this = this;
        this.users.forEach(function (u) {
            if (str === _this.userid) {
                return;
            }
            else if (u.user.userid === str) {
                u.available = !u.available;
                if (u.available) {
                    _this.pl.addToUser(u.user.userid, _this.playlistid);
                }
                else {
                    _this.pl.removeFromUser(u.user.userid, _this.playlistid);
                }
            }
        });
    };
    PlaylistPageComponent.prototype.queryUser = function () {
        var _this = this;
        this.users = [];
        this.apollo.query({
            query: getUserPlaylist,
            variables: {
                playlistid: this.playlistid,
                userid: this.userid
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data userssssss', data);
            _this.users = data.getUserSavedPlaylist;
            _this.users.forEach(function (u) {
                u.available = true;
                u.enabled = false;
                if (u.user.userid === _this.userid) {
                    u.enabled = true;
                }
            });
            console.log('userssss ', _this.users);
        }, function (error) {
            console.log(error);
        });
    };
    PlaylistPageComponent.prototype.moveOneUp = function (vid) {
        this.pl.updateDetail(vid, this.playlistid, 'oneUp', false);
        this.swap(vid, 'upOne');
    };
    PlaylistPageComponent.prototype.moveOneDown = function (v) {
        this.pl.updateDetail(v, this.playlistid, 'oneDown', false);
        this.swap(v, 'downOne');
    };
    PlaylistPageComponent.prototype.moveUp = function (v) {
        this.pl.updateDetail(v, this.playlistid, 'up', false);
        this.move(v, 'up');
    };
    PlaylistPageComponent.prototype.moveDown = function (v) {
        this.pl.updateDetail(v, this.playlistid, 'down', false);
        this.move(v, 'down');
        // this.query();
    };
    PlaylistPageComponent.prototype.swap = function (vid, condition) {
        var choice = this.videos.filter(function (v) { return v.video.videoid === vid; })[0];
        var temp;
        var _loop_1 = function (i) {
            if (condition === 'upOne') {
                temp = this_1.videos.filter(function (v) { return v.videoorder === (choice.videoorder - i); })[0];
            }
            else if (condition === 'downOne') {
                temp = this_1.videos.filter(function (v) { return v.videoorder === (choice.videoorder + i); })[0];
            }
            if (temp !== undefined) {
                console.log('ini temp gannn ', temp);
                return "break";
            }
        };
        var this_1 = this;
        for (var i = 1; i < this.videos.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        var tempOrder = temp.videoorder;
        var choiceOrder = choice.videoorder;
        this.videos.forEach(function (v) {
            if (v.video.videoid === vid) {
                v.videoorder = tempOrder;
            }
            else if (v.video.videoid === temp.video.videoid) {
                v.videoorder = choiceOrder;
            }
        });
        this.sortByOrderFunc();
    };
    PlaylistPageComponent.prototype.move = function (vid, condition) {
        var _this = this;
        var choice = this.videos.filter(function (v) { return v.video.videoid === vid; })[0];
        var choiceOrder = choice.videoorder;
        this.videos.forEach(function (v) {
            switch (condition) {
                case 'up':
                    if (v.videoorder < choiceOrder) {
                        v.videoorder++;
                        console.log('ini v', v);
                    }
                    if (v.video.videoid === choice.video.videoid) {
                        v.videoorder = 1;
                    }
                    break;
                case 'down':
                    if (v.videoorder > choiceOrder) {
                        v.videoorder--;
                        console.log('ini v', v);
                    }
                    if (v.video.videoid === choice.video.videoid) {
                        v.videoorder = _this.videos.length;
                    }
                    break;
            }
        });
        this.sortByOrderFunc();
    };
    PlaylistPageComponent.prototype.sortDateAddedFunc = function (str) {
        if (this.sortDatePublished) {
            this.sortDatePublished = !this.sortDatePublished;
        }
        if (this.sortPopular) {
            this.sortPopular = !this.sortPopular;
        }
        if (this.sortDateAdded) {
            this.sortDateAdded = !this.sortDateAdded;
            this.sortByOrderFunc();
        }
        this.videos = this.videos.sort(function (b, a) {
            var d1 = new Date(a.dateadded);
            var d2 = new Date(b.dateadded);
            if (str == 'desc') {
                return (d2.getTime() - d1.getTime());
            }
            else {
                return (d1.getTime() - d2.getTime());
            }
        });
    };
    PlaylistPageComponent.prototype.sortPopularityFunc = function (str) {
        if (this.sortDatePublished) {
            this.sortDatePublished = !this.sortDatePublished;
        }
        if (this.sortPopular) {
            this.sortPopular = !this.sortPopular;
            this.sortByOrderFunc();
        }
        if (this.sortDateAdded) {
            this.sortDateAdded = !this.sortDateAdded;
        }
        this.videos = this.videos.sort(function (b, a) {
            var d1 = (a.video.viewcount);
            var d2 = (b.video.viewcount);
            if (str == 'desc') {
                return (d2 - d1);
            }
            else {
                return (d1 - d2);
            }
        });
    };
    PlaylistPageComponent.prototype.sortDatePublishedFunc = function (str) {
        if (this.sortDatePublished) {
            this.sortDatePublished = !this.sortDatePublished;
            this.sortByOrderFunc();
        }
        if (this.sortPopular) {
            this.sortPopular = !this.sortPopular;
        }
        if (this.sortDateAdded) {
            this.sortDateAdded = !this.sortDateAdded;
        }
        this.videos = this.videos.sort(function (b, a) {
            var d1 = new Date(a.video.publishtime);
            var d2 = new Date(b.video.publishtime);
            if (str == 'desc') {
                return (d2.getTime() - d1.getTime());
            }
            else {
                return (d1.getTime() - d2.getTime());
            }
        });
    };
    PlaylistPageComponent.prototype.changeShareVisible = function (b) {
        this.shareVisible = b;
    };
    PlaylistPageComponent.prototype.addUserPlaylist = function () {
        this.pl.addToUser(this.userid, this.playlistid);
        this.existInLibrary = true;
    };
    PlaylistPageComponent.prototype.removeUserPlaylist = function () {
        this.pl.removeFromUser(this.userid, this.playlistid);
        this.existInLibrary = false;
    };
    PlaylistPageComponent.prototype.ngOnInit = function () {
        // var acc = document.getElementsByClassName("accordion");
        // var i;
        var _this = this;
        // for (i = 0; i < acc.length; i++) {
        //   acc[i].addEventListener("click", function () {
        //     this.classList.toggle("active");
        //     var panel = this.nextElementSibling;
        //     if (panel.style.maxHeight) {
        //       console.log('asdsadsadsadas');
        //       // panel.style.maxHeight = null;
        //     } else {
        //       console.log('asdsadsadsadas');
        //       panel.style.maxHeight = panel.scrollHeight + "px";
        //     }
        //   });
        // }
        this.route.paramMap.subscribe(function (params) {
            console.log(params.get('playlistid'));
            _this.playlistid = params.get('playlistid');
            _this.existInLibrary = _this.pl.checkSaved(_this.playlistid);
            console.log('exis int library', _this.existInLibrary);
            _this.userService.currUserID.subscribe(function (u) {
                _this.userid = u;
                _this.premium.currPremiumId.subscribe(function (p) { return _this.premid = p; });
                _this.query();
                _this.queryUser();
            });
            _this.pl.currPlaylist.subscribe(function (p) {
                _this.pls = p;
                if (_this.pls != null) {
                    _this.pls.forEach(function (element) {
                        if (element.playlist.playlistid == _this.playlistid) {
                            _this.existInLibrary = true;
                        }
                    });
                }
            });
        });
    };
    PlaylistPageComponent.prototype.playPlaylist = function (bool) {
        this.pl.playPlaylist(bool, this.playlistid);
    };
    PlaylistPageComponent.prototype.changeTitle = function () {
        this.editTitle = !this.editTitle;
    };
    PlaylistPageComponent.prototype.changeDesc = function () {
        this.editDesc = !this.editDesc;
    };
    PlaylistPageComponent.prototype.changePriv = function () {
        this.editPriv = !this.editPriv;
    };
    PlaylistPageComponent.prototype.updatePriv = function () {
        var typ = '1';
        this.changethisPriv();
        if (this.isPrivate) {
            typ = '2';
        }
        this.pl.updatePlaylist(this.userid, this.playlistid, '', '', typ, '', '');
        this.changePriv();
    };
    PlaylistPageComponent.prototype.changethisPriv = function () {
        this.isPrivate = !this.isPrivate;
        console.log('is private ', this.isPrivate);
    };
    PlaylistPageComponent.prototype.updateTitle = function () {
        this.pl.updatePlaylist(this.userid, this.playlistid, this.title, '', '', '', '');
        this.changeTitle();
    };
    PlaylistPageComponent.prototype.updateDesc = function () {
        this.pl.updatePlaylist(this.userid, this.playlistid, '', this.desc, '', '', '');
        this.changeDesc();
    };
    PlaylistPageComponent.prototype.deleteAllVideos = function () {
        this.pl.deletePlaylistDetail(this.playlistid, '');
        this.videos = [];
    };
    PlaylistPageComponent.prototype.query = function () {
        var _this = this;
        this.videos = [];
        console.log('ini pls id ', this.playlistid);
        this.apollo.query({
            query: q,
            variables: {
                id: this.playlistid
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data ', data);
            _this.vcount = data.playlist.playlist.videocount;
            _this.playlist = data.playlist.playlist.playlists;
            if (_this.playlist.privacyid == '2') {
                _this.isPrivate = true;
                if (_this.userid !== _this.playlist.userid) {
                    alert('THIS IS A PRIVATE PLAYLIST!');
                    _this.router.navigate(['/']);
                }
            }
            _this.title = _this.playlist.playlisttitle;
            _this.desc = _this.playlist.playlistdescription;
            console.log('got playlist ', _this.playlist);
            _this.videos = data.playlist.playlist.playlists.playlistdetails;
            _this.videos = _this.checkType(_this.videos);
            _this.sortByOrderFunc();
            console.log('ini videos ', _this.videos);
            _this.creator = data.playlist.user.user;
            console.log('ini creatorrrr ', _this.creator);
            if (_this.userid == _this.playlist.userid) {
                _this.ownPlaylist = true;
            }
            else {
                _this.ownPlaylist = false;
            }
            _this.totalViewCount = 0;
            _this.videos.forEach(function (e) {
                console.log(_this.totalViewCount);
                _this.totalViewCount += e.viewcount;
            });
            _this.subcount = data.playlist.user.count;
            _this.vcount = data.playlist.user.videoCount;
        }, function (error) {
            console.log(error);
        });
    };
    PlaylistPageComponent.prototype.sortByOrderFunc = function () {
        this.videos = this.videos.sort(function (s1, s2) {
            var string1;
            string1 = s1.videoorder;
            var string2;
            string2 = s2.videoorder;
            return (string1 - string2);
        });
    };
    PlaylistPageComponent.prototype.checkType = function (input) {
        if (this.premid == null || this.premid == '1') {
            input = input.filter(function (i) { return i.video.typeid !== '2'; });
        }
        return input;
    };
    PlaylistPageComponent = __decorate([
        core_1.Component({
            selector: 'app-playlist-page',
            templateUrl: './playlist-page.component.html',
            styleUrls: ['./playlist-page.component.scss']
        })
    ], PlaylistPageComponent);
    return PlaylistPageComponent;
}());
exports.PlaylistPageComponent = PlaylistPageComponent;
var templateObject_1, templateObject_2;
