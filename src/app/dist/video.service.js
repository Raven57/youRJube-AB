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
exports.VideoService = void 0;
var rxjs_1 = require("rxjs");
var graphql_tag_1 = require("graphql-tag");
var core_1 = require("@angular/core");
var upload = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation createNewUser(\n  $title: String!,\n  $desc: String!,\n  $userid: ID!,\n  $typeid: ID!,\n  $locationid: ID!,\n  $restrictionid: ID!,\n  $categoryid: ID!,\n  $privacyid: ID!,\n  $Minute:Int!,)\n  {\n   uploadVideo(input:{\n    videotitle:$title,\n    videodescription: $desc,\n    userid:$userid,\n    typeid:$typeid,\n  \tlocationid:$locationid,\n    restrictionid:$restrictionid,\n    categoryid:$categoryid,\n    privacyid:$privacyid,\n    publishAfterMinute:$Minute,\n  }){\n    videotitle\n  }\n}\n"], ["\nmutation createNewUser(\n  $title: String!,\n  $desc: String!,\n  $userid: ID!,\n  $typeid: ID!,\n  $locationid: ID!,\n  $restrictionid: ID!,\n  $categoryid: ID!,\n  $privacyid: ID!,\n  $Minute:Int!,)\n  {\n   uploadVideo(input:{\n    videotitle:$title,\n    videodescription: $desc,\n    userid:$userid,\n    typeid:$typeid,\n  \tlocationid:$locationid,\n    restrictionid:$restrictionid,\n    categoryid:$categoryid,\n    privacyid:$privacyid,\n    publishAfterMinute:$Minute,\n  }){\n    videotitle\n  }\n}\n"])));
var update = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation updVid(\n  $userid: ID!,\n  $videoid: ID!,\n  $videotitle: String,\n  $videodescription: String,\n  $thumbnailsource: String,\n  $viewcount: Float,\n  $privacyid: ID,\n){\n  updateVideo(input:{\n    userid: $userid,\n    videoid: $videoid,\n    videotitle: $videotitle,\n    videodescription: $videodescription,\n    thumbnailsource: $thumbnailsource,\n    viewcount: $viewcount,\n    privacyid: $privacyid,\n  })\n}\n"], ["\nmutation updVid(\n  $userid: ID!,\n  $videoid: ID!,\n  $videotitle: String,\n  $videodescription: String,\n  $thumbnailsource: String,\n  $viewcount: Float,\n  $privacyid: ID,\n){\n  updateVideo(input:{\n    userid: $userid,\n    videoid: $videoid,\n    videotitle: $videotitle,\n    videodescription: $videodescription,\n    thumbnailsource: $thumbnailsource,\n    viewcount: $viewcount,\n    privacyid: $privacyid,\n  })\n}\n"])));
var del = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation delVid(\n  $id:ID!\n){\n  deleteVideo(videoid:$id)\n}\n"], ["\nmutation delVid(\n  $id:ID!\n){\n  deleteVideo(videoid:$id)\n}\n"])));
var finalize = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation finishUpload(\n  $title: String!,\n  $userid: ID!,\n  $vid: String!,\n  $th: String!,\n  $l: String!)\n  {\n    finishUpload(input:{\n    videoname:$title,\n    userid:$userid,\n    videosource:$vid,\n    thumbnailsource:$th,\n    length:$l,\n  }){\n    videotitle\n  }\n}\n"], ["\nmutation finishUpload(\n  $title: String!,\n  $userid: ID!,\n  $vid: String!,\n  $th: String!,\n  $l: String!)\n  {\n    finishUpload(input:{\n    videoname:$title,\n    userid:$userid,\n    videosource:$vid,\n    thumbnailsource:$th,\n    length:$l,\n  }){\n    videotitle\n  }\n}\n"])));
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var VideoService = /** @class */ (function () {
    function VideoService(apollo) {
        this.apollo = apollo;
        this.videos = [];
        this.userVids = [];
        this.valid = true;
        this.key = 'queue';
        this.value = [];
        this.queueSource = new rxjs_1.BehaviorSubject(null);
        this.currQueue = this.queueSource.asObservable();
    }
    VideoService.prototype.addQueue = function (vidid) {
        var counted;
        this.currQueue.subscribe(function (p) {
            if (p == null) {
                counted = 0;
            }
            else {
                counted = p.length;
            }
        });
        counted++;
        this.value.push({ videoid: vidid, order: counted });
        var str = JSON.stringify(this.value);
        sessionStorage.setItem(this.key, str);
        this.getQueue();
        alert('Success add to queue');
    };
    VideoService.prototype.removeQueue = function () {
        sessionStorage.clear();
        this.queueSource.next(null);
    };
    VideoService.prototype.getQueue = function () {
        var session = JSON.parse(sessionStorage.getItem('queue'));
        console.log(session);
        this.queueSource.next(session);
    };
    VideoService.prototype.upload = function (titl, des, useri, typei, locationi, restrictioni, categoryi, privacyi, Minut) {
        var _this = this;
        this.apollo.mutate({
            mutation: upload,
            variables: {
                title: titl,
                desc: des,
                userid: useri,
                typeid: typei,
                locationid: locationi,
                restrictionid: restrictioni,
                categoryid: categoryi,
                privacyid: privacyi,
                Minute: Minut
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
            _this.valid = true;
        }, function (error) {
            console.log('error', error);
            alert(error);
            _this.valid = false;
        });
        return this.valid;
    };
    VideoService.prototype.finalize = function (titl, user, vidurl, thurl, len) {
        console.log(titl);
        console.log(user);
        console.log(vidurl);
        console.log(thurl);
        console.log(len);
        this.apollo.mutate({
            mutation: finalize,
            variables: {
                title: titl,
                vid: vidurl,
                userid: user,
                th: thurl,
                l: len
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    VideoService.prototype.del = function (vidid) {
        this.apollo.mutate({
            mutation: del,
            variables: {
                id: vidid
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
            window.location.reload();
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    VideoService.prototype.update = function (us, vid, tit, des, thu, vc, priv) {
        this.apollo.mutate({
            mutation: update,
            variables: {
                userid: us,
                videoid: vid,
                videotitle: tit,
                videodescription: des,
                thumbnailsource: thu,
                viewcount: vc,
                privacyid: priv
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
            window.location.reload();
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    VideoService.prototype.getDateDiff = function (publish) {
        var dateDif = '';
        var currentDate = new Date();
        var min = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds()) -
            Date.UTC(publish.getFullYear(), publish.getMonth(), publish.getDate(), publish.getHours(), publish.getMinutes(), publish.getSeconds(), publish.getMilliseconds())) / (1000));
        var temp = 0;
        //ini 1000 ms berarti 1 detik
        if (min <= 0) {
            temp = -1 * min;
            dateDif = 'Will be released in ';
        }
        else {
            temp = min;
        }
        var y = Math.floor(temp / 31556952);
        if (y <= 0) {
            var mon = Math.floor(temp / 2629746);
            if (mon <= 0) {
                var d = Math.floor(temp / 86400);
                if (d <= 0) {
                    var hour = Math.floor(temp / 3600);
                    if (hour <= 0) {
                        var minute = Math.floor(temp / 60);
                        if (minute <= 0) {
                            var second = temp;
                            if (min < 0) {
                                dateDif += second.toString() + ' Second(s)';
                            }
                            else {
                                dateDif = second.toString() + ' S Ago';
                            }
                        }
                        else {
                            if (min < 0) {
                                dateDif += minute.toString() + ' Minute(s)';
                            }
                            else {
                                dateDif = minute.toString() + ' M Ago';
                            }
                        }
                    }
                    else {
                        if (min < 0) {
                            dateDif += hour.toString() + ' Hour(s)';
                        }
                        else {
                            dateDif = hour.toString() + ' H Ago';
                        }
                    }
                }
                else {
                    if (min < 0) {
                        dateDif += d.toString() + ' Day(s)';
                    }
                    else {
                        dateDif = d.toString() + ' Day(s) Ago';
                    }
                }
            }
            else {
                if (min < 0) {
                    dateDif += mon.toString() + ' Month';
                }
                else {
                    dateDif = mon.toString() + ' Mon Ago';
                }
            }
        }
        else {
            if (min < 0) {
                dateDif += y.toString() + ' Year';
            }
            else {
                dateDif = y.toString() + ' Y Ago';
            }
        }
        return dateDif;
    };
    VideoService.prototype.getDateDiffString = function (str) {
        var dateDif = '';
        var currentDate = new Date();
        var publish = new Date(str);
        var min = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds()) -
            Date.UTC(publish.getFullYear(), publish.getMonth(), publish.getDate(), publish.getHours(), publish.getMinutes(), publish.getSeconds(), publish.getMilliseconds())) / (1000));
        var temp = 0;
        //ini 1000 ms berarti 1 detik
        if (min <= 0) {
            temp = -1 * min;
            dateDif = 'Will be released in ';
        }
        else {
            temp = min;
        }
        var y = Math.floor(temp / 31556952);
        if (y <= 0) {
            var mon = Math.floor(temp / 2629746);
            if (mon <= 0) {
                var d = Math.floor(temp / 86400);
                if (d <= 0) {
                    var hour = Math.floor(temp / 3600);
                    if (hour <= 0) {
                        var minute = Math.floor(temp / 60);
                        if (minute <= 0) {
                            var second = temp;
                            if (min < 0) {
                                dateDif += second.toString() + ' Second(s)';
                            }
                            else {
                                dateDif = second.toString() + ' S Ago';
                            }
                        }
                        else {
                            if (min < 0) {
                                dateDif += minute.toString() + ' Minute(s)';
                            }
                            else {
                                dateDif = minute.toString() + ' M Ago';
                            }
                        }
                    }
                    else {
                        if (min < 0) {
                            dateDif += hour.toString() + ' Hour(s)';
                        }
                        else {
                            dateDif = hour.toString() + ' H Ago';
                        }
                    }
                }
                else {
                    if (min < 0) {
                        dateDif += d.toString() + ' Day(s)';
                    }
                    else {
                        dateDif = d.toString() + ' Day(s) Ago';
                    }
                }
            }
            else {
                if (min < 0) {
                    dateDif += mon.toString() + ' Month';
                }
                else {
                    dateDif = mon.toString() + ' Mon Ago';
                }
            }
        }
        else {
            if (min < 0) {
                dateDif += y.toString() + ' Year';
            }
            else {
                dateDif = y.toString() + ' Y Ago';
            }
        }
        return dateDif;
    };
    VideoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
