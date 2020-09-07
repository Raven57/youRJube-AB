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
exports.VideoDescriptionComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var cekLike = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery ceklike($userid: ID, $postid:ID){\n  checkLike(input:{userid:$userid,videoid:$postid})\n}\n"], ["\nquery ceklike($userid: ID, $postid:ID){\n  checkLike(input:{userid:$userid,videoid:$postid})\n}\n"])));
var cekDislike = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery cekdislike($userid: ID, $postid:ID){\n  checkDisike(input:{userid:$userid,videoid:$postid})\n}\n"], ["\nquery cekdislike($userid: ID, $postid:ID){\n  checkDisike(input:{userid:$userid,videoid:$postid})\n}\n"])));
var VideoDescriptionComponent = /** @class */ (function () {
    function VideoDescriptionComponent(com, apollo) {
        this.com = com;
        this.apollo = apollo;
    }
    VideoDescriptionComponent.prototype.ngOnInit = function () {
        // this.checkDislike();
        // this.checkLike();
        console.log(this.videoURL);
        if (this.like == null) {
            this.like = 0;
        }
        if (this.dislike == null) {
            this.dislike = 0;
        }
    };
    VideoDescriptionComponent.prototype.clickLike = function () {
        if (this.liked) {
            this.liked = !this.liked;
            this.com.deletelike(this.currUserID, this.videoID);
            this.like--;
        }
        else if (this.disliked) {
            this.liked = true;
            this.disliked = !this.disliked;
            this.com.deleteDislike(this.currUserID, this.videoID);
            this.com.like(this.currUserID, this.videoID);
            this.like++;
            this.dislike--;
        }
        else {
            this.com.like(this.currUserID, this.videoID);
            this.like++;
            this.liked = !this.liked;
        }
    };
    VideoDescriptionComponent.prototype.clickDislike = function () {
        if (this.disliked) {
            this.dislike--;
            this.disliked = !this.disliked;
            this.com.deleteDislike(this.currUserID, this.videoID);
        }
        else if (this.liked) {
            this.disliked = true;
            this.liked = !this.liked;
            this.com.deletelike(this.currUserID, this.videoID);
            this.com.dislike(this.currUserID, this.videoID);
            this.dislike++;
            this.like--;
        }
        else {
            this.com.dislike(this.currUserID, this.videoID);
            this.dislike++;
            this.disliked = !this.disliked;
        }
    };
    VideoDescriptionComponent.prototype.checkDislike = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: cekDislike,
            variables: {
                userid: this.currUserID,
                postid: this.videoID
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            // this.liked = data
            console.log('Data disliked', data);
            _this.disliked = data.checkDisike;
        }, function (error) {
            console.log('error', error);
            // alert(error);
        });
    };
    VideoDescriptionComponent.prototype.checkLike = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: cekLike,
            variables: {
                userid: this.currUserID,
                postid: this.videoID
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            // this.liked = data
            console.log('Data liked', data);
            _this.liked = data.checkLike;
        }, function (error) {
            console.log('error', error);
            // alert(error);
        });
    };
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "ownChannel");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "usertype");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "notif");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "subscribed");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "premium");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "view");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "datePub");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "like");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "dislike");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "channel");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "channelSub");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "channelImg");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "desc");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "category");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "currUserID");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "videoID");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "videoURL");
    __decorate([
        core_1.Input()
    ], VideoDescriptionComponent.prototype, "v");
    VideoDescriptionComponent = __decorate([
        core_1.Component({
            selector: 'app-video-description',
            templateUrl: './video-description.component.html',
            styleUrls: ['./video-description.component.scss']
        })
    ], VideoDescriptionComponent);
    return VideoDescriptionComponent;
}());
exports.VideoDescriptionComponent = VideoDescriptionComponent;
var templateObject_1, templateObject_2;
