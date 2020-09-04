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
exports.ChannelItemComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var checkSubscribe = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery checkSub($user:ID!,\n  $channel:ID!){\n  checkSubscribe(input:{userid:$user, channelid:$channel}){\n    userid,channelid,notification\n  }\n}\n"], ["\nquery checkSub($user:ID!,\n  $channel:ID!){\n  checkSubscribe(input:{userid:$user, channelid:$channel}){\n    userid,channelid,notification\n  }\n}\n"])));
var ChannelItemComponent = /** @class */ (function () {
    function ChannelItemComponent(apollo, userService, sub) {
        this.apollo = apollo;
        this.userService = userService;
        this.sub = sub;
    }
    ChannelItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currUser.subscribe(function (user) {
            _this.user = user;
        });
        this.userService.currUserID.subscribe(function (user) {
            _this.userid = user;
            if (_this.userid) {
                _this.query();
            }
        });
    };
    ChannelItemComponent.prototype.subscribe = function () {
        if (this.userid == null) {
            alert('LOG IN TO SUBSCRIBE!');
        }
        this.sub.subscribe(this.userid, this.channelid);
    };
    ChannelItemComponent.prototype.unsubscribe = function () {
        this.sub.unsubscribe(this.userid, this.channelid);
    };
    ChannelItemComponent.prototype.notifOn = function () {
        this.sub.updateNotif(this.userid, this.channelid, true);
    };
    ChannelItemComponent.prototype.notifOff = function () {
        this.sub.updateNotif(this.userid, this.channelid, false);
    };
    ChannelItemComponent.prototype.query = function () {
        var _this = this;
        if (this.channelid === this.userid) {
            this.ownChannel = true;
        }
        else {
            this.ownChannel = false;
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
        }
    };
    __decorate([
        core_1.Input()
    ], ChannelItemComponent.prototype, "icon");
    __decorate([
        core_1.Input()
    ], ChannelItemComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], ChannelItemComponent.prototype, "subscriber");
    __decorate([
        core_1.Input()
    ], ChannelItemComponent.prototype, "videos");
    __decorate([
        core_1.Input()
    ], ChannelItemComponent.prototype, "description");
    __decorate([
        core_1.Input()
    ], ChannelItemComponent.prototype, "channelid");
    __decorate([
        core_1.Input()
    ], ChannelItemComponent.prototype, "ownChannel");
    ChannelItemComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-item',
            templateUrl: './channel-item.component.html',
            styleUrls: ['./channel-item.component.scss']
        })
    ], ChannelItemComponent);
    return ChannelItemComponent;
}());
exports.ChannelItemComponent = ChannelItemComponent;
var templateObject_1;
