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
exports.ChannelPageComponent = void 0;
var graphql_tag_1 = require("graphql-tag");
var core_1 = require("@angular/core");
var checkSubscribe = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery checkSub($user:ID,\n  $channel:ID!){\n  checkSubscribe(input:{userid:$user, channelid:$channel}){\n    userid,channelid,notification\n  }\n}\n"], ["\nquery checkSub($user:ID,\n  $channel:ID!){\n  checkSubscribe(input:{userid:$user, channelid:$channel}){\n    userid,channelid,notification\n  }\n}\n"])));
var getVideoPage = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery channelvid($userid:ID,\n  $sortby: String){\n  channelVideoQuery(filter:{\n    userid:$userid,sortby:$sortby\n  }){\n    user{\n      userid,\n      username\n    },\n    videoid,\n    thumbnailsource,\n    length,\n    videotitle,\n    publishtime,\n    viewcount,\n    typeid\n  }\n}\n"], ["\nquery channelvid($userid:ID,\n  $sortby: String){\n  channelVideoQuery(filter:{\n    userid:$userid,sortby:$sortby\n  }){\n    user{\n      userid,\n      username\n    },\n    videoid,\n    thumbnailsource,\n    length,\n    videotitle,\n    publishtime,\n    viewcount,\n    typeid\n  }\n}\n"])));
var getPlaylistPage = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  query channelPlay(\n    $userid: ID,\n    $typeid: ID,\n    $restrictionid: ID\n  ){\n    channelPlaylistQuery(filter:{\n      userid:$userid,restrictionid:$restrictionid,typeid:$typeid\n    }){\n      playlisttitle,\n    updatedtime,\n    user{\n      username\n    },\n    thumbnailsource\n    }\n  }\n"], ["\n  query channelPlay(\n    $userid: ID,\n    $typeid: ID,\n    $restrictionid: ID\n  ){\n    channelPlaylistQuery(filter:{\n      userid:$userid,restrictionid:$restrictionid,typeid:$typeid\n    }){\n      playlisttitle,\n    updatedtime,\n    user{\n      username\n    },\n    thumbnailsource\n    }\n  }\n"])));
var getPost = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nquery getAllPost($userid: ID){\n  posts(filter:{userid:$userid}){\n    post{\n      postid,\n      posttitle,\n      postdetail,\n      posttime,\n      postpicture,\n      user{\n        username\n      }\n    },\n    like,\n    dislike\n  }\n}\n"], ["\nquery getAllPost($userid: ID){\n  posts(filter:{userid:$userid}){\n    post{\n      postid,\n      posttitle,\n      postdetail,\n      posttime,\n      postpicture,\n      user{\n        username\n      }\n    },\n    like,\n    dislike\n  }\n}\n"])));
var getChannelData = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nquery checkUser($userid: ID!) {\n  getUserAndSubscriber(userid:$userid){\n    user{\n      userid,\n      username,\n      joindate,\n      profileimgaddr,\n      bgimgaddr,\n      channeldetail, channelurl\n    }\n    count, vcount\n  }\n}"], ["\nquery checkUser($userid: ID!) {\n  getUserAndSubscriber(userid:$userid){\n    user{\n      userid,\n      username,\n      joindate,\n      profileimgaddr,\n      bgimgaddr,\n      channeldetail, channelurl\n    }\n    count, vcount\n  }\n}"])));
var getByUser = graphql_tag_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["\nquery get($userid: ID!){\n  video(userid:$userid){\n    user{\n      userid,\n      username\n    },\n    videoid,\n    thumbnailsource,\n    length,\n    videotitle,\n    publishtime,\n    viewcount,\n    typeid\n  }\n}\n"], ["\nquery get($userid: ID!){\n  video(userid:$userid){\n    user{\n      userid,\n      username\n    },\n    videoid,\n    thumbnailsource,\n    length,\n    videotitle,\n    publishtime,\n    viewcount,\n    typeid\n  }\n}\n"])));
var get = graphql_tag_1["default"](templateObject_7 || (templateObject_7 = __makeTemplateObject(["\nquery getVideoSetting {\n  privacies{\n    privacyid,\n    privacyname\n  }}"], ["\nquery getVideoSetting {\n  privacies{\n    privacyid,\n    privacyname\n  }}"])));
var getVideo = graphql_tag_1["default"](templateObject_8 || (templateObject_8 = __makeTemplateObject(["\nquery getvid($videoid:ID!){\n  oneVideo(videoid:$videoid){\n    typeid,\n    videoid,\n    videotitle,\n    videodescription,\n    thumbnailsource,\n    privacyid,\n    user {\n      userid,\n      username\n    },\n    publishtime,\n    viewcount,\n    length\n  }\n}\n"], ["\nquery getvid($videoid:ID!){\n  oneVideo(videoid:$videoid){\n    typeid,\n    videoid,\n    videotitle,\n    videodescription,\n    thumbnailsource,\n    privacyid,\n    user {\n      userid,\n      username\n    },\n    publishtime,\n    viewcount,\n    length\n  }\n}\n"])));
var home = graphql_tag_1["default"](templateObject_9 || (templateObject_9 = __makeTemplateObject(["\nquery chHome(\n  $userid: ID){\n  channelHomeQuery(filter:{\n    userid:$userid}){\n    recent{\n      videoid,\n      typeid,\n      videotitle,\n      videodescription,\n      thumbnailsource,\n      privacyid,\n      user {\n        userid,\n        username\n      },\n      publishtime,\n      viewcount,\n      length\n    },\n    random{\n      videoid,\n      videotitle,\n      typeid,\n      videodescription,\n      thumbnailsource,\n      privacyid,\n      user {\n        userid,\n        username\n      },\n      publishtime,\n      viewcount,\n      length\n    },\n    playlist{\n    playlisttitle,\n    updatedtime,\n    user{\n      username\n    },\n    thumbnailsource\n    }\n  }}\n"], ["\nquery chHome(\n  $userid: ID){\n  channelHomeQuery(filter:{\n    userid:$userid}){\n    recent{\n      videoid,\n      typeid,\n      videotitle,\n      videodescription,\n      thumbnailsource,\n      privacyid,\n      user {\n        userid,\n        username\n      },\n      publishtime,\n      viewcount,\n      length\n    },\n    random{\n      videoid,\n      videotitle,\n      typeid,\n      videodescription,\n      thumbnailsource,\n      privacyid,\n      user {\n        userid,\n        username\n      },\n      publishtime,\n      viewcount,\n      length\n    },\n    playlist{\n    playlisttitle,\n    updatedtime,\n    user{\n      username\n    },\n    thumbnailsource\n    }\n  }}\n"])));
var ChannelPageComponent = /** @class */ (function () {
    function ChannelPageComponent(route, apollo, router, premium, userService, post, sub, vid) {
        this.route = route;
        this.apollo = apollo;
        this.router = router;
        this.premium = premium;
        this.userService = userService;
        this.post = post;
        this.sub = sub;
        this.vid = vid;
        this.showVids = false;
        this.showOneVid = false;
        this.showDes = false;
        this.showLink = false;
        this.stop = false;
        this.stopDua = false;
        this.stopTiga = false;
        this.stopEmpat = false;
        this.selector = 1;
        this.ready = false;
        this.name = '';
        this.bgimg = '';
        this.prof = '';
        this.chdet = '';
        this.churl = '';
        this.newDesc = '';
        this.newLink = '';
        this.posttitle = '';
        this.postdet = '';
        this.vcount = 0;
        this.count = 0;
        this.check = 0;
        this.url = '';
        this.sortby = 'popular';
        this.last = 4;
        this.values = [
            {
                key: "popular",
                value: "popular"
            },
            {
                key: "oldest",
                value: "oldest"
            },
            {
                key: "newest",
                value: "newest"
            }
        ];
    }
    ChannelPageComponent.prototype.ngAfterViewInit = function () {
        // this.checkQuery(this.userid, 2);
    };
    ChannelPageComponent.prototype.setThumb = function (url) {
        this.newThumb = url;
    };
    ChannelPageComponent.prototype.openVid = function (int) {
        var _this = this;
        this.currvidid = int;
        console.log('int  ', int);
        this.showOneVid = !this.showOneVid;
        this.showVids = !this.showVids;
        this.apollo.watchQuery({
            query: get
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            _this.privacies = data.privacies;
            _this.apollo.watchQuery({
                query: getVideo,
                variables: {
                    videoid: int
                }
            }).valueChanges.subscribe(function (_a) {
                var data = _a.data;
                _this.currTitle = data.oneVideo.videotitle;
                _this.currDesc = data.oneVideo.videodescription;
                _this.currPriv = data.oneVideo.privacyid;
                _this.currName = data.oneVideo.user.username;
                _this.currThumb = data.oneVideo.thumbnailsource;
                var asd = new Date(data.oneVideo.publishtime);
                _this.currDate = _this.vid.getDateDiff(asd);
                _this.currView = data.oneVideo.viewcount;
                _this.currLen = data.oneVideo.length;
            }, function (error) {
                console.log('error', error);
                // alert(error);
            });
        }, function (error) {
            console.log('error', error);
            // alert(error);
        });
    };
    ChannelPageComponent.prototype.deleteVid = function () {
        this.vid.del(this.currvidid);
    };
    ChannelPageComponent.prototype.showVid = function (id) {
        var _this = this;
        this.showVids = !this.showVids;
        this.apollo.watchQuery({
            query: getByUser,
            variables: {
                userid: id
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            _this.videos = data.video;
        }, function (error) {
            console.log('error', error);
            // alert(error);
        });
    };
    ChannelPageComponent.prototype.confirmPost = function () {
        if ((this.posttitle != null && this.posttitle != '') &&
            ((this.postdet != null && this.postdet != '') || (this.PostImgString != null && this.PostImgString != ''))) {
            this.post.postapost(this.userid, this.posttitle, this.postdet, this.PostImgString);
        }
    };
    ChannelPageComponent.prototype.changeSelector = function (idx) {
        this.selector = idx;
        switch (idx) {
            case 1:
                this.queryHome();
                break;
            case 2:
                this.queryVideos(this.sortby);
                break;
            case 3:
                this.queryPlaylist();
                break;
            case 4:
                this.queryPost();
                break;
        }
    };
    ChannelPageComponent.prototype.queryVideos = function (sort) {
        var _this = this;
        this.apollo.watchQuery({
            query: getVideoPage,
            variables: {
                userid: this.channelid,
                sortby: sort
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            console.log('DATA VIDEO PAGE \n', data);
            _this.videos = data.channelVideoQuery;
            _this.videos = _this.checkType(_this.videos);
        });
    };
    ChannelPageComponent.prototype.checkType = function (input) {
        if (this.premid == null || this.premid == '1') {
            input = input.filter(function (i) { return i.typeid !== '2'; });
        }
        return input;
    };
    ChannelPageComponent.prototype.queryPlaylist = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: getPlaylistPage,
            variables: {
                userid: this.channelid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            console.log('DATA PLAYLIST PAGE ', data);
            _this.playlists = data.channelPlaylistQuery;
        });
    };
    ChannelPageComponent.prototype.queryPost = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: getPost,
            variables: {
                userid: this.channelid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            _this.posts = data.posts.post;
            var likes = data.posts.like;
            var dislike = data.posts.dislike;
            for (var i = 0; i < _this.posts.length; i++) {
                _this.posts[i].like = likes[i];
                _this.posts[i].dislike = dislike[i];
            }
            console.log('POSTS ', _this.posts);
        });
    };
    ChannelPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.obs.observe(document.querySelector(".foot"));
        this.obs = new IntersectionObserver(function (entry) {
            console.log('masdukk');
            if (entry[0].isIntersecting) {
                var main = document.querySelector(".vid");
                for (var i = 0; i < 2; i++) {
                    if (_this.last < _this.videos.length) {
                        var div = document.createElement("div");
                        var app = document.createElement("app-video-card");
                        app.setAttribute("typeid", "this.videos[last].typeid");
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
        this.url = this.router.url;
        this.userService.currUser.subscribe(function (user) {
            _this.user = user;
            _this.checkQuery(_this.user, 1);
        });
        this.userService.currUserID.subscribe(function (user) {
            _this.userid = user;
            _this.checkQuery(_this.userid, 2);
        });
        this.premium.currPremiumId.subscribe(function (p) { return _this.premid = p; });
        // this.ownChannel = false;
        var id;
        this.route.paramMap.subscribe(function (params) {
            // this.category = cats[+params.get('categoryid')];
            console.log(+params.get('userid'));
            id = params.get('userid').toString();
            // this.checkQuery(id, 1);
            console.log('id ', id);
            _this.apollo.watchQuery({
                query: getChannelData,
                variables: {
                    userid: id
                }
            }).valueChanges.subscribe(function (_a) {
                var data = _a.data, loading = _a.loading, errors = _a.errors;
                console.log(data);
                _this.channelid = data.getUserAndSubscriber.user.userid;
                _this.name = data.getUserAndSubscriber.user.username;
                _this.bgimg = data.getUserAndSubscriber.user.bgimgaddr;
                _this.prof = data.getUserAndSubscriber.user.profileimgaddr;
                _this.count = data.getUserAndSubscriber.count;
                _this.chdet = data.getUserAndSubscriber.user.channeldetail;
                _this.churl = data.getUserAndSubscriber.user.channelurl;
                _this.joind = new Date(data.getUserAndSubscriber.user.joindate);
                _this.vcount = data.getUserAndSubscriber.vcount;
                _this.checkQuery(_this.vcount, 3);
            });
        });
    };
    ChannelPageComponent.prototype.checkQuery = function (inp, inc) {
        if (inp != null) {
            this.check++;
            console.log('cek channel', inc, this.check);
        }
        if (this.check > 2) {
            this.query();
        }
    };
    ChannelPageComponent.prototype.query = function () {
        var _this = this;
        console.log('useridd  ', this.userid);
        this.apollo.watchQuery({
            query: checkSubscribe,
            variables: {
                user: this.userid,
                channel: this.channelid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            console.log('SUBSCRIBED', data.checkSubscribe);
            if (data != null) {
                _this.subbed = data.checkSubscribe;
                _this.notif = data.checkSubscribe.notification;
            }
        });
        if (this.channelid === this.userid) {
            this.ownChannel = true;
            console.log('ownChannel', this.ownChannel);
        }
        this.queryHome();
    };
    ChannelPageComponent.prototype.queryHome = function () {
        var _this = this;
        console.log('masuk bambang');
        this.apollo.watchQuery({
            query: home,
            variables: {
                userid: this.channelid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            console.log('DATAAA ', data);
            _this.randoms = data.channelHomeQuery.random;
            _this.randoms = _this.checkType(_this.randoms);
            _this.recents = data.channelHomeQuery.recent;
            _this.recents = _this.checkType(_this.recents);
            _this.playlists = data.channelHomeQuery.playlist;
        });
    };
    ChannelPageComponent.prototype.subscribe = function () {
        this.sub.subscribe(this.userid, this.channelid);
    };
    ChannelPageComponent.prototype.unsubscribe = function () {
        this.sub.unsubscribe(this.userid, this.channelid);
    };
    ChannelPageComponent.prototype.notifOn = function () {
        this.sub.updateNotif(this.userid, this.channelid, true);
    };
    ChannelPageComponent.prototype.notifOff = function () {
        this.sub.updateNotif(this.userid, this.channelid, false);
    };
    ChannelPageComponent.prototype.copy = function () {
        return 'https://tpa-webab.web.app' + this.url;
        // return 'https://www.google.com';
    };
    ChannelPageComponent.prototype.setThumbnailURL = function (string) {
        this.thumbnailurl = string;
    };
    ChannelPageComponent.prototype.setPostUrl = function (string) {
        this.PostImgString = string;
    };
    ChannelPageComponent.prototype.showDesc = function () {
        this.showDes = !this.showDes;
    };
    ChannelPageComponent.prototype.btnshowLink = function () {
        this.showLink = !this.showLink;
    };
    ChannelPageComponent.prototype.confirmDesc = function () {
        this.userService.update(this.user, null, this.newDesc, null, null, null, null, null, null, null);
    };
    ChannelPageComponent.prototype.confirmLink = function () {
        this.userService.update(this.user, null, null, this.newLink, null, null, null, null, null, null);
    };
    ChannelPageComponent.prototype.uploadProfile = function (event) {
        var _this = this;
        if (event != null) {
            this.bufferPicture = event.target.files[0];
            if (!this.validateImage(this.bufferPicture.name)) {
                alert('Selected file format is not supported');
                this.bufferPicture = null;
            }
            else {
                var reader_1 = new FileReader();
                reader_1.onload = function (e) { return _this.imgString = reader_1.result; };
                reader_1.readAsDataURL(this.bufferPicture);
            }
        }
    };
    ChannelPageComponent.prototype.uploadImg = function (event) {
        if (event != null) {
            this.bufferPost = event.target.files[0];
            if (!this.validateImage(this.bufferPost.name)) {
                alert('Selected file format is not supported');
                this.bufferPost = null;
            }
            else {
                // const reader = new FileReader();
                // reader.onload = e => this.PostImgString = reader.result as string;
                // reader.readAsDataURL(this.bufferPost);
            }
        }
    };
    ChannelPageComponent.prototype.updateVid = function () {
        this.vid.update(this.userid, this.currvidid, this.currTitle, this.currDesc, this.newThumb, null, this.currPriv);
    };
    ChannelPageComponent.prototype.uploadNew = function (event) {
        if (event != null) {
            this.newThumbnailFile = event.target.files[0];
            if (!this.validateImage(this.newThumbnailFile.name)) {
                alert('Selected file format is not supported');
                this.newThumbnailFile = null;
            }
        }
    };
    ChannelPageComponent.prototype.setBGURL = function (string) {
        this.bgurl = string;
    };
    ChannelPageComponent.prototype.uploadbg = function (event) {
        var _this = this;
        if (event != null) {
            this.bufferBG = event.target.files[0];
            if (!this.validateImage(this.bufferBG.name)) {
                alert('Selected file format is not supported');
                this.bufferBG = null;
            }
            else {
                var reader_2 = new FileReader();
                reader_2.onload = function (e) { return _this.bgString = reader_2.result; };
                reader_2.readAsDataURL(this.bufferBG);
            }
        }
    };
    ChannelPageComponent.prototype.confirmBG = function () {
        this.imgBG = this.bufferBG;
    };
    ChannelPageComponent.prototype.confirmCheckBG = function () {
        this.userService.update(this.user, null, null, null, this.bgurl, null, null, null, null, null);
        this.bgimg = this.bgurl;
    };
    ChannelPageComponent.prototype.confirmProf = function () {
        this.imgFile = this.bufferPicture;
    };
    ChannelPageComponent.prototype.confirmCheckProf = function () {
        this.userService.update(this.user, null, null, null, null, this.thumbnailurl, null, null, null, null);
        this.user.photoUrl = this.thumbnailurl;
        this.userService.changeUser(this.user);
    };
    ChannelPageComponent.prototype.validateImage = function (name) {
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'jpg') {
            return true;
        }
        else if (ext.toLowerCase() == 'png') {
            return true;
        }
        else {
            return false;
        }
    };
    ChannelPageComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-page',
            templateUrl: './channel-page.component.html',
            styleUrls: ['./channel-page.component.scss']
        })
    ], ChannelPageComponent);
    return ChannelPageComponent;
}());
exports.ChannelPageComponent = ChannelPageComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
