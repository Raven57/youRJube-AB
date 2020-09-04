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
exports.SearchPageComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var q = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery search($keyword:String!,$item: String, $date:String,$prem:String) {\n  search(input:{keyword:$keyword,date:$date,item:$item,premiumid:$prem}){\n    videos{\n      videoid, videodescription,thumbnailsource,length,userid,typeid,restrictionid,viewcount,\n      videotitle,publishtime, user{\n        username\n      }\n    },\n    channels{\n      user{username, userid,profileimgaddr,channeldetail},\n      count,\n      videoCount\n    },\n    playlists{\n      playlists{\n        playlistid, playlisttitle, thumbnailsource,user{\n          username\n        }, playlistdescription\n      }\n      videocount\n    }\n  }\n}\n"], ["\nquery search($keyword:String!,$item: String, $date:String,$prem:String) {\n  search(input:{keyword:$keyword,date:$date,item:$item,premiumid:$prem}){\n    videos{\n      videoid, videodescription,thumbnailsource,length,userid,typeid,restrictionid,viewcount,\n      videotitle,publishtime, user{\n        username\n      }\n    },\n    channels{\n      user{username, userid,profileimgaddr,channeldetail},\n      count,\n      videoCount\n    },\n    playlists{\n      playlists{\n        playlistid, playlisttitle, thumbnailsource,user{\n          username\n        }, playlistdescription\n      }\n      videocount\n    }\n  }\n}\n"])));
var SearchPageComponent = /** @class */ (function () {
    function SearchPageComponent(route, apollo) {
        this.route = route;
        this.apollo = apollo;
        this.filterweek = false;
        this.filtermonth = false;
        this.filteryear = false;
        this.filtervideo = false;
        this.filterplaylist = false;
        this.filterchannel = false;
        this.filterdate = '';
        this.filteritem = '';
        this.key = '';
    }
    SearchPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                }
                else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
        this.route.paramMap.subscribe(function (params) {
            _this.key = params.get('keyword');
            if (_this.key != null) {
                _this.query();
            }
        });
    };
    SearchPageComponent.prototype.query = function () {
        var _this = this;
        console.log(this.key);
        console.log(this.filteritem);
        console.log(this.filterdate);
        this.apollo.query({
            query: q,
            variables: {
                keyword: this.key,
                item: this.filteritem,
                date: this.filterdate
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data ', data);
            _this.videos = data.search.videos;
            _this.playlists = data.search.playlists;
            _this.channels = data.search.channels;
        }, function (error) {
            console.log(error);
        });
    };
    SearchPageComponent.prototype.filterDate = function (str) {
        this.filterdate = str;
        switch (str) {
            case 'week':
                if (this.filterweek) {
                    this.filterdate = '';
                }
                this.filterweek = !this.filterweek;
                if (this.filtermonth) {
                    this.filtermonth = !this.filtermonth;
                }
                if (this.filteryear) {
                    this.filteryear = !this.filteryear;
                }
                this.query();
                break;
            case 'month':
                if (this.filtermonth) {
                    this.filterdate = '';
                }
                this.filtermonth = !this.filtermonth;
                if (this.filterweek) {
                    this.filterweek = !this.filterweek;
                }
                if (this.filteryear) {
                    this.filteryear = !this.filteryear;
                }
                this.query();
                break;
            case 'year':
                if (this.filteryear) {
                    this.filterdate = '';
                }
                this.filteryear = !this.filteryear;
                if (this.filterweek) {
                    this.filterweek = !this.filterweek;
                }
                if (this.filtermonth) {
                    this.filtermonth = !this.filtermonth;
                }
                this.query();
                break;
        }
    };
    SearchPageComponent.prototype.filterType = function (str) {
        this.filteritem = str;
        switch (str) {
            case 'channel':
                if (this.filterchannel) {
                    this.filteritem = '';
                }
                this.filterchannel = !this.filterchannel;
                if (this.filtervideo) {
                    this.filtervideo = !this.filtervideo;
                }
                if (this.filterplaylist) {
                    this.filterplaylist = !this.filtermonth;
                }
                this.query();
                break;
            case 'video':
                if (this.filtervideo) {
                    this.filteritem = '';
                }
                this.filtervideo = !this.filtervideo;
                if (this.filterplaylist) {
                    this.filterplaylist = !this.filterplaylist;
                }
                if (this.filterchannel) {
                    this.filterchannel = !this.filterchannel;
                }
                this.query();
                break;
            case 'playlist':
                if (this.filterplaylist) {
                    this.filteritem = '';
                }
                this.filterplaylist = !this.filterplaylist;
                if (this.filtervideo) {
                    this.filtervideo = !this.filtervideo;
                }
                if (this.filterchannel) {
                    this.filterchannel = !this.filterchannel;
                }
                this.query();
                break;
        }
    };
    SearchPageComponent = __decorate([
        core_1.Component({
            selector: 'app-search-page',
            templateUrl: './search-page.component.html',
            styleUrls: ['./search-page.component.scss']
        })
    ], SearchPageComponent);
    return SearchPageComponent;
}());
exports.SearchPageComponent = SearchPageComponent;
var templateObject_1;
